import { isServer } from 'solid-js/web'
import Layer from '../classes/Layer'
import Entity from '../classes/Entity'

const FLIPPED_HORIZONTALLY_FLAG = 0x80000000
const FLIPPED_VERTICALLY_FLAG = 0x40000000
const FLIPPED_DIAGONALLY_FLAG = 0x20000000

function getTileImage(tileNumber, tileSets) {
  for (
    let currentTile = 0, currentSet = 0, length = tileSets.length;
    currentSet < length && currentTile <= tileNumber;
    currentSet++
  ) {
    const tileSet = tileSets[currentSet]
    const setLength = tileSet.data.tilecount
    if (tileNumber - currentTile < setLength) {
      const targetTile = tileNumber - currentTile
      //if (tileNumber !== 0) console.log({ tileNumber, targetTile })
      return tileSet.nthImage(targetTile)
    }
    currentTile += setLength
  }
  //console.log('got null', tileNumber)
  return null
}

function parseProperties(layerProperties) {
  const output = {}
  layerProperties.forEach(({ name, value }) => {
    output[name] = value
  })
  return output
}

class TiledMap {
  constructor(data, tileSets) {
    this.root = new Layer()
    // Note: Data should follow the JSON format from the Tiled map editor
    //console.log({ data })
    data.layers.forEach((layerData, i) => {
      const properties = 'properties' in layerData ? parseProperties(layerData.properties) : {}
      const layer = new Layer({ z: isFinite(properties.z) ? properties.z : i })
      this.root.addLayer(layer)
      const { data, width, height } = layerData
      const tileWidth = 100 / width
      const tileHeight = 100 / height
      for (let i = 0, l = data.length; i < l; i++) {
        const x = i % width
        const y = Math.floor(i / width)
        const tileGID = data[i] - 1
        const tileNumber =
          tileGID & ~(FLIPPED_HORIZONTALLY_FLAG | FLIPPED_VERTICALLY_FLAG | FLIPPED_DIAGONALLY_FLAG)
        if (tileNumber < 0) {
          continue // No tile here
        }
        const tileImage = getTileImage(tileNumber, tileSets)
        if (tileImage === null) {
          console.warn('Could not find a matching image for tile ID ' + tileNumber)
          continue
        }
        //if (tileNumber !== 0) console.log(tileNumber, x, y)
        const horizontallyFlipped = !!(tileGID & FLIPPED_HORIZONTALLY_FLAG)
        const verticallyFlipped = !!(tileGID & FLIPPED_VERTICALLY_FLAG)
        const diagonallyFlipped = !!(tileGID & FLIPPED_DIAGONALLY_FLAG)
        const position = {
          x: x * tileWidth,
          y: y * tileHeight,
          width: tileWidth,
          height: tileHeight,
          horizontallyFlipped,
          verticallyFlipped,
          diagonallyFlipped
        }
        const entity = new Entity(position, { img: tileImage })
        layer.addEntity(entity)
      }
      //console.log(layer)
    })
  }
}

export default TiledMap

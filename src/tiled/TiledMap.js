import { isServer } from 'solid-js/web'
import Layer from '../classes/Layer'
import Entity from '../classes/Entity'

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
  console.log('got null', tileNumber)
  return null
}

class TiledMap {
  constructor(data, tileSets) {
    this.root = new Layer()
    // Note: Data should follow the JSON format from the Tiled map editor
    //console.log({ data })
    data.layers.forEach((layerData, i) => {
      const layer = new Layer({ z: i })
      this.root.addLayer(layer)
      const { data, width, height } = layerData
      const tileWidth = 100 / width
      const tileHeight = 100 / height
      for (let i = 0, l = data.length; i < l; i++) {
        const x = i % width
        const y = Math.floor(i / width)
        const tileNumber = data[i] - 1
        if (tileNumber < 0) {
          continue // No tile here
        }
        const tileImage = getTileImage(tileNumber, tileSets)
        if (tileImage === null) {
          console.warn('Could not find a matching image for tile ID ' + tileNumber)
          continue
        }
        //if (tileNumber !== 0) console.log(tileNumber, x, y)
        const entity = new Entity(
          { x: x * tileWidth, y: y * tileHeight, width: tileWidth, height: tileHeight },
          { img: tileImage }
        )
        layer.addEntity(entity)
      }
      //console.log(layer)
    })
  }
}

export default TiledMap

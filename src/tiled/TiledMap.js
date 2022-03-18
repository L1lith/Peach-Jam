import { isServer } from 'solid-js/web'
import Layer from '../classes/Layer'
import Entity from '../classes/Entity'

function getTileImage(tileNumber, tileSets) {
  for (
    let currentTile = 0, currentSet = 0, length = tileSets.length;
    currentTile < length && currentTile < tileNumber;
    currentSet++
  ) {
    const tileSet = tileSets[currentSet]
    const setLength = tileSet.data.tilecount
    if (tileNumber - currentTile < setLength) {
      const targetTile = tileNumber - currentTile
      return tileSet.nthImage(targetTile)
      // const { image } = tileSet
      // const { columns, tilewidth, tileheight } = tileSet.data
      // const x = (targetTile % columns) * tilewidth
      // const y = Math.floor(targetTile / columns) * tileheight
      // console.log(image, x, y, tilewidth, tileheight)
    }
    currentTile += setLength
  }
  return null
}

class TiledMap {
  constructor(data, tileSets) {
    this.root = new Layer()
    // Note: Data should follow the JSON format from the Tiled map editor
    //console.log({ data })
    data.layers.forEach(layerData => {
      const layer = new Layer()
      this.root.addLayer(layer)
      const { data, width, height } = layerData
      const tileWidth = 100 / width
      const tileHeight = 100 / height
      for (let i = 0, l = data.length; i < l; i++) {
        const x = (i % width) * tileWidth
        const y = Math.floor(i / width) * tileHeight
        const tileNumber = data[i]
        const tileImage = getTileImage(tileNumber, tileSets)
        const entity = new Entity(
          { x, y, width: tileWidth, height: tileHeight },
          { img: tileImage }
        )
        layer.addEntity(entity)
      }
      //console.log(layer)
    })
  }
}

export default TiledMap

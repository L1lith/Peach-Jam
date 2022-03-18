import useEntity from '../hooks/useEntity'
import { isServer } from 'solid-js/web'
import Layer from '../classes/Layer'
import TileMap from '../classes/TileMap'

function getTile(data, tileNumber) {
  return
}

class TiledMap extends TileMap {
  constructor(data, tileSets) {
    super()
    // Note: Data should follow the JSON format from the Tiled map editor
    // this.layers = data.layers.map(layerData => {
    //   const layer = new Layer()
    // })
  }
}

export default TiledMap

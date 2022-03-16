import useEntity from '../hooks/useEntity'
import { isServer } from 'solid-js/web'

function getTile(data, tileNumber) {
  return
}

function Map({ data, tileSets }) {
  // Note: Data should follow the JSON format from the Tiled map editor
  if (isServer) {
    return null // TODO: Implement ISO map rendering
  } else {
    console.log(data)
  }
}

export default Map

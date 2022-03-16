import useEntity from '../hooks/useEntity'
import { isServer } from 'solid-js/web'

function Map({ data }) {
  if (isServer) {
    return null // TODO: Implement ISO map rendering
  } else {
    console.log(data)
  }
}

export default Map

import autoBind from 'auto-bind'
import { sanitize } from 'sandhands'
import positionFormat from '../src/formats/position'

const propsFormat = { ...positionFormat }

function Wall(props) {
  sanitize(props, propsFormat)
  return null
}

export default Wall

import coordinateFormat from '../formats/coordinate'
//import { nanoid } from 'nanoid'
import strictDiff from '../functions/strictDiff'
import Emitter from './Emitter'

const defaultPosition = {
  x: 0,
  y: 0,
  width: 50,
  height: 50,
  xAnchor: 0,
  yAnchor: 0,
  rotation: 0
}

export const positionProps = ['x', 'y', 'width', 'height', 'xAnchor', 'yAnchor', 'rotation']

class Entity {
  constructor(position = {}, props = {}) {
    //this.id = nanoid()
    //console.log(position, props)
    this.events = new Emitter()
    this.props = { ...props }
    this.position = { ...defaultPosition, ...position }
    this.hasPhysics = props.physics == 'object' && props.physics !== null
    this.isRendered = !('isRendered' in props) || !!props.isRendered
  }
  setPosition(position) {
    const oldPosition = this.position
    this.position = { ...this.position, ...position }
    const diff = strictDiff(oldPosition, this.position)
    if (Object.keys(diff).length > 0) this.events.emit('position', diff, this.position)
  }
}

export default Entity

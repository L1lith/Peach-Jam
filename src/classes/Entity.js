import strictDiff from '../functions/strictDiff'
import Emitter from './Emitter'
import { Rectangle } from '../boiler/PhysicsShapes'
import { Immovable, HardBody } from '../boiler/PhysicsModes'

const defaultPosition = {
  x: 0,
  y: 0,
  z: 0,
  width: 50,
  height: 50,
  depth: 0,
  // xAnchor: 0, // Currently Disabled
  // yAnchor: 0,
  // yScale: 1,
  // xScale: 1,
  rotation: 0,
  verticallyFlipped: false,
  diagonallyFlipped: false,
  horizontallyFlipped: false
}
const defaultPhysics = {
  shape: Rectangle,
  mode: Immovable,
  body: HardBody
}

export const positionProps = Object.keys(defaultPosition) //['x', 'y', 'width', 'height', 'xAnchor', 'yAnchor', 'rotation']

class Entity {
  constructor(position = {}, props = {}) {
    this.events = new Emitter()
    this.props = { ...props }
    this.position = { ...defaultPosition, ...position }
    this.hasPhysics =
      props.physics == 'object' && props.physics !== null && props.physics.mode !== 'none'
    this.isRendered = !('isRendered' in props) || !!props.isRendered
    this.layer = null
    this.renderer = null
    this.physics = this.hasPhysics ? { ...defaultPhysics, ...props.physics } : { mode: 'none' }
  }
  static type = 'Entity'
  setPosition(position) {
    const oldPosition = this.position
    this.position = { ...this.position, ...position }
    const diff = strictDiff(oldPosition, this.position)
    if (Object.keys(diff).length > 0) this.events.emit('position', diff, this.position)
  }
}

export default Entity

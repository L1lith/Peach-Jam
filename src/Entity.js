import coordinateFormat from './formats/coordinate'
//import { nanoid } from 'nanoid'

const defaultPosition = {
  x: 0,
  y: 0,
  width: 50,
  height: 50,
  xAnchor: 0.5,
  yAnchor: 0.5,
  rotation: 0
}

const positionProps = ['x', 'y', 'width', 'height']

class Entity {
  constructor(props = {}) {
    //this.id = nanoid()
    this.props = { ...props }
    this.position = { ...defaultPosition }
    for (let i = 0, l = positionProps.length; i < l; i++) {
      const prop = positionProps[i]
      if (props.hasOwnProperty(prop)) {
        this.position[prop] = this.props[prop]
        delete this.props[prop]
      }
    }
    console.log('p', this.position)
    this.hasPhysics = props.physics == 'object' && props.physics !== null
    this.isRendered = !props.hasOwnProperty('isRendered') || !!props.isRendered
  }
  destroy() {
    this.physics.removeEntity(this)
  }
  setPosition(position) {
    this.position = { ...this.position, ...position }
  }
}

export default Entity

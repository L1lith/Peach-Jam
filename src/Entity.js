import coordinateFormat from './formats/coordinate'

class Entity {
  constructor(position, props = {}) {
    this.position = position
    this.props = props
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

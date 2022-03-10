import coordinateFormat from './formats/coordinate'

class Entity {
  constructor(position, props = {}) {
    //sanitize(position, positionFormat)
    this.position = position
    this.props = props
    this.hasPhysics = props.physics == 'object' && props.physics !== null
  }
  destroy() {
    this.physics.removeEntity(this)
  }
  setPosition(position) {
    this.position = { ...this.position, ...position }
  }
}

export default Entity

import coordinateFormat from './formats/coordinate'

class Entity {
  constructor(position, physics) {
    sanitize(position, positionFormat)
    this.position = position
    this.physics = physics
    physics.addEntity(this)
  }
  destroy() {
    this.physics.removeEntity(this)
  }
  setPosition(position) {
    this.position = { ...this.position, ...position }
  }
}

export default Entity

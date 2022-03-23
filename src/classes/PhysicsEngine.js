import autoBind from 'auto-bind'

const defaultProps = {
  worldBounds: { x: [0, 100], y: [0, 100] },
  gravity: { x: 0, y: 0 }
}

class PhysicsEngine {
  constructor(props = {}) {
    autoBind(this)
    this.props = { ...defaultProps, ...props }
    this.clear()
  }
  static type = 'PhysicsEngine'
  clear() {
    this.entities = []
  }
  addEntity(entity) {
    if (!this.entities.includes(entity)) {
      this.entities.push(entity)
    }
  }
  removeEntity(entity) {
    const index = this.entities.indexOf(entity)
    if (index >= 0) {
      this.entities.splice(index, 1)
    }
  }
  doPhysicsTick(delta) {
    // Here: Calculate and call onCollision handlers
  }
  resetPhysics() {
    this.clear()
    // Do nothing
  }
  attachLayer() {
    //Do Nothing
  }
}

export default PhysicsEngine

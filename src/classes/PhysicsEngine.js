import autoBind from 'auto-bind'

class PhysicsEngine {
  constructor() {
    this.clearEntities()
    autoBind(this)
  }
  static type = 'PhysicsEngine'
  clearEntities() {
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
  doPhysicsTick() {
    // Here: Calculate and call onCollision handlers
  }
}

export default PhysicsEngine

import autoBind from 'auto-bind'

class PhysicsEngine {
  constructor() {
    this.clearEntities()
    autoBind(this)
  }
  clearEntities() {
    this.entities = new WeakSet()
  }
  addEntity(entity) {
    this.entities.add(entity)
  }
  removeEntity(entity) {
    this.entities.delete(entity)
  }
  doPhysicsTick() {
    // Here: Calculate and call onCollision handlers
  }
}

export default PhysicsEngine

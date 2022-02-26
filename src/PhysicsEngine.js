import autoBind from 'auto-bind'
import Entity from './Entity'

class PhysicsEngine {
  constructor() {
    this.clearEntities()
    autoBind(this)
  }
  static Entity = Entity
  clearEntities() {
    this.entities = []
  }
  addEntity(props) {
    const entity = new this.constructor.Entity(props, this)
    this.entities.push(entity)
    return true
  }
  removeEntity(entity) {
    const index = this.entities.indexOf(entity)
    if (index < 0) return false
    this.entities.splice(index, 1)
    entity.destroy()
    return true
  }
}

export default PhysicsEngine

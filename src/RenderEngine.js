import autoBind from 'auto-bind'

class RenderEngine {
  constructor() {
    this.clearEntities()
    autoBind(this)
  }
  clearEntities() {
    this.entities = new WeakSet()
  }
  addEntity(entity) {
    console.log({ entity })
    this.entities.add(entity)
  }
  removeEntity(entity) {
    this.entities.delete(entity)
  }
  render(children) {
    return children // Just mirror the children (do nothing)
  }
}

export default RenderEngine

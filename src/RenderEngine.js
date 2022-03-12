class RenderEngine {
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
  render() {
    return null
  }
}

export default RenderEngine

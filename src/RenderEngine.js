import autoBind from 'auto-bind'

class RenderEngine {
  constructor() {
    this.clearEntities()
    autoBind(this)
  }
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
  doRender(children) {
    return children // Just mirror the children (do nothing)
  }
}

export default RenderEngine

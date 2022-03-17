import autoBind from 'auto-bind'

class Layer {
  constructor(renderer) {
    this.clearEntities()
    autoBind(this)
    this.renderer = renderer
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
}

export default Layer

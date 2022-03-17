import autoBind from 'auto-bind'
import Entity from './Entity'

class Layer {
  constructor(parentLayer = null) {
    autoBind(this)
    this.parentLayer = parentLayer
    this.clear()
  }
  clear() {
    this.layers = []
    this.entities = []
  }
  addLayer(layer) {
    if (!(layer instanceof Layer)) throw new Error('Please supply a valid layer instance')
    if (!this.layers.includes(layer)) {
      this.layers.push(layer)
    }
  }
  removeLayer(layer) {
    if (!(layer instanceof Layer)) throw new Error('Please supply a valid layer instance')
    const index = this.layers.indexOf(layer)
    if (index >= 0) {
      this.layers.splice(index, 1)
    }
  }
  addEntity(entity) {
    if (!(entity instanceof Entity)) throw new Error('Please supply a valid Entity')
    if (!this.entities.includes(entity)) {
      this.entities.push(entity)
    }
  }
  removeEntity(entity) {
    if (!(entity instanceof Entity)) throw new Error('Please supply a valid Entity')
    const index = this.entities.indexOf(entity)
    if (index >= 0) {
      this.entities.splice(index, 1)
    }
  }
}

export default Layer

import autoBind from 'auto-bind'
import Entity from './Entity'
import Emitter from './Emitter'

class Layer {
  constructor(parentLayer = null, engine = null) {
    autoBind(this)
    this.parentLayer = parentLayer
    this.engine = engine
    this.events = new Emitter()
    this.clear()
  }
  clear() {
    this.layers = []
    this.entities = []
  }
  addLayer(layer) {
    if (!(layer instanceof Layer)) throw new Error('Please supply a valid layer instance')
    layer.engine = this.engine
    if (!this.layers.includes(layer)) {
      this.layers.push(layer)
    }
    this.events.emit('addLayer', layer)
  }
  removeLayer(layer) {
    if (!(layer instanceof Layer)) throw new Error('Please supply a valid layer instance')
    const index = this.layers.indexOf(layer)
    layer.engine = null
    if (index >= 0) {
      this.layers.splice(index, 1)
    }
    this.events.emit('removeLayer', layer)
  }
  addEntity(entity) {
    if (!(entity instanceof Entity)) throw new Error('Please supply a valid Entity')
    entity.engine = this.engine
    if (!this.entities.includes(entity)) {
      this.entities.push(entity)
    }
    this.events.emit('addEntity', entity)
  }
  removeEntity(entity) {
    if (!(entity instanceof Entity)) throw new Error('Please supply a valid Entity')
    entity.engine = null
    const index = this.entities.indexOf(entity)
    if (index >= 0) {
      this.entities.splice(index, 1)
    }
    this.events.emit('removeEntity', entity)
  }
}

export default Layer

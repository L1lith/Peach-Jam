import autoBind from 'auto-bind'
import Layer from './Layer'

class RenderEngine {
  constructor() {
    autoBind(this)
    this.clearLayers()
  }
  clearLayers(withRoot = true) {
    this.layers = []
    if (withRoot) {
      this.rootLayer = this.createLayer()
      this.addEntity = this.rootLayer.addEntity
      this.removeEntity = this.rootLayer.removeEntity
      this.createEntity = this.rootLayer.createEntity
      this.addLayer(this.rootLayer)
    } else {
      this.rootLayer = null
      this.addEntity = null
      this.removeEntity = null
      this.createEntity = null
    }
  }
  addLayer(layer) {
    if (!this.layers.includes(layer)) {
      this.layers.push(layer)
    }
  }
  removeLayer(layer) {
    const index = this.layers.indexOf(layer)
    if (index >= 0) {
      this.layers.splice(index, 1)
    }
  }
  doRender(children) {
    return children // Just mirror the children (do nothing)
  }
  createLayer() {
    return new Layer(this)
  }
}

export default RenderEngine

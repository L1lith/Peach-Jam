import autoBind from 'auto-bind'
import Layer from './Layer'

class RenderEngine {
  constructor() {
    autoBind(this)
    this.clear()
  }
  clear() {
    this.rootLayer = new Layer()
    this.addLayer = this.rootLayer.addLayer
    this.removeLayer = this.rootLayer.removeLayer
  }
  doRender(children) {
    return children // Just mirror the children (do nothing)
  }
}

export default RenderEngine

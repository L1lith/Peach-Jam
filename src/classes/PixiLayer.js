import Layer from './Layer'
import { Container } from 'pixi.js'
import autoBind from 'auto-bind'

class PixiLayer extends Layer {
  constructor() {
    super()
    autoBind(this)
  }
  clear() {
    super.clear()
    this.container = new Container()
    console.log(this)
    if (this.parentLayer !== null) this.parentLayer.container.appendChild(this.container)
  }
  addLayer(layer) {
    super.addLayer(layer)
    this.container.addChild(layer)
  }
  removeLayer(layer) {
    super.removeLayer(layer)
    this.container.removeChild(layer)
  }
  addEntity(entity) {
    super.addEntity(entity)
    this.container.addChild(entity)
  }
  removeEntity(entity) {
    super.removeEntity(entity)
    this.container.removeChild(entity)
  }
}

export default PixiLayer

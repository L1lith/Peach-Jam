import autoBind from 'auto-bind'
import Layer from './Layer'

class RenderEngine {
  constructor() {
    autoBind(this)
  }
  static type = 'RenderEngine'
  doRender(children) {
    return children // Just mirror the children (do nothing)
  }
}

export default RenderEngine

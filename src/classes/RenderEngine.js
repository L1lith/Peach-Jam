import autoBind from 'auto-bind'
import Layer from './Layer'

class RenderEngine {
  constructor() {
    autoBind(this)
  }
  doRender(children) {
    return children // Just mirror the children (do nothing)
  }
}

export default RenderEngine

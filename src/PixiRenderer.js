import * as PIXI from 'pixi.js'

import RenderEngine from './RenderEngine'

class PixiRenderer extends RenderEngine {
  constructor() {
    super()
    this.pixiApp = new PIXI.Application()
  }
  addEntity(entity) {
    super.addEntity(entity)
  }
}

export default PixiRenderer

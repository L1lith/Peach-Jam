import { Loader, Sprite, Application, Texture, Container, utils } from 'pixi.js'
import { onMount } from 'solid-js'
import autoBind from 'auto-bind'
import PixiLayer from './PixiLayer'

import RenderEngine from '../classes/RenderEngine'

utils.skipHello() // Disable the Pixi banner in console

class PixiRenderer extends RenderEngine {
  constructor(pixiProps = {}) {
    super()
    autoBind(this)
    this.pixiProps = pixiProps
  }
  attachEntities(layer) {
    if (!(layer instanceof PixiLayer)) return
    layer.entities.forEach(entity => {
      entity.setPixiPosition()
      entity.events.on('position', entity.setPixiPosition)

    })
    layer.layers.forEach(this.attachEntities)
  }
  getRealX(x) {
    return (x / 100) * this.width
  }
  getRealY(y) {
    return (y / 100) * this.height
  }
  getAutoSize() {
    return this.pixiHolder.getBoundingClientRect()
  }
  doMount() {
      window.pixi = this.pixiApp = new Application({
        ...this.pixiProps,
        width: window.innerWidth,
        height: window.innerHeight
      })
      this.width = window.innerWidth
      this.height = window.innerHeight
      this.pixiHolder.appendChild(this.pixiApp.view)
      const resize = () => {
        // Resize the renderer
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.pixiApp.renderer.resize(window.innerWidth, window.innerHeight)
      }
      window.addEventListener('resize', resize)
      this.attachEntities(this.root)
      this.setRoot(this.root)
  }
  doRender(root) {
    this.root = root
    onMount(this.doMount)
    document.body.style.overflow = 'hidden'
    return <div ref={this.pixiHolder}></div>
  }
  setRoot(layer) {
    if (layer instanceof PixiLayer && this.pixiApp) {
      const pixiApp = this.pixiApp
      for(let i = 0, l = pixiApp.stage.children.length; i < l; i++) {
          const child = pixiApp.stage.children[i]
          pixiApp.stage.removeChild(child)
      }
      pixiApp.stage.addChild(layer.container)
    }
  }
  loadImage(url) {}
}

export default PixiRenderer

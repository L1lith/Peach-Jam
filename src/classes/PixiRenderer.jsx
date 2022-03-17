import { Loader, Sprite, Application, Texture, Container, utils } from 'pixi.js'
import { onMount } from 'solid-js'
import autoBind from 'auto-bind'
import PixiLayer from './PixiLayer'

import RenderEngine from './RenderEngine'

utils.skipHello() // Disable the Pixi banner in console


class PixiRenderer extends RenderEngine {
  constructor(pixiProps = {}) {
    super()
    autoBind(this)
    this.pixiProps = pixiProps
    //this.levelContainer = new Container()
  }
  clear() {
    super.clear()
    this.rootLayer = new PixiLayer()
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
  doRender() {
    onMount(() => {
      window.pixi = this.pixiApp = new Application({
        ...this.pixiProps,
        width: window.innerWidth,
        height: window.innerHeight
      })
      const levelContainer = this.rootLayer.container
      this.pixiApp.stage.addChild(levelContainer)
      this.width = window.innerWidth
      this.height = window.innerHeight
      //this.pixiHolder.appendChild(this.rootLayer.container)
      const resize = () => {
        // Resize the renderer
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.pixiApp.renderer.resize(window.innerWidth, window.innerHeight)
        this.entities.forEach(entity => entity.setPixiPosition())
      }
      window.addEventListener('resize', resize)
      this.entities.forEach(entity => {
        if (entity.setPixiPosition) entity.setPixiPosition()
      })
    })
    document.body.style.overflow = 'hidden'
    return <div ref={this.pixiHolder}></div>
  }
  loadImage(url) {}
}

export default PixiRenderer

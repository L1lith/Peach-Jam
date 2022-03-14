import { Loader, Sprite, Application, Texture, Container, utils } from 'pixi.js'
import { onMount } from 'solid-js'

import RenderEngine from './RenderEngine'

utils.skipHello()

class PixiRenderer extends RenderEngine {
  constructor(pixiProps = {}) {
    super()
    this.pixiProps = pixiProps
    this.levelContainer = new Container()
  }
  addEntity(entity) {
    super.addEntity(entity)
    if (typeof entity.props.img == 'string') {
      const texture = Texture.from(entity.props.img)
      const pixiBody = (entity.pixiBody = new Sprite(texture))
      entity.setPixiPosition = () => {
        pixiBody.anchor.set(entity.position.anchorX, entity.position.anchorY)
        pixiBody.x = this.getRealX(entity.position.x)
        pixiBody.y = this.getRealY(entity.position.y)
        pixiBody.width = this.getRealX(entity.position.width)
        pixiBody.height = this.getRealY(entity.position.height)
        // console.log(
        //   this.getRealX(entity.position.x),
        //   this.getRealY(entity.position.y),
        //   this.getRealX(entity.position.width),
        //   this.getRealY(entity.position.height)
        // )
      }
      this.levelContainer.addChild(pixiBody)
      //console.log(this.levelContainer.children)
      entity.events.on('position', entity.setPixiPosition)
    } else {
      console.warn('Entity missing image')
    }
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
      this.pixiApp.stage.addChild(this.levelContainer)
      this.width = window.innerWidth
      this.height = window.innerHeight
      this.pixiHolder.appendChild(this.pixiApp.view)
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
}

export default PixiRenderer

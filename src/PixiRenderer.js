import * as PIXI from 'pixi.js'
import { onMount } from 'solid-js'

import RenderEngine from './RenderEngine'

class PixiRenderer extends RenderEngine {
  constructor(pixiProps = {}) {
    super()
    this.pixiProps = pixiProps
  }
  addEntity(entity) {
    super.addEntity(entity)
    console.log({ props: entity.props })
    if (typeof entity.props.img == 'string') {
      PIXI.Loader.shared.add(entity.props.img, entity.props.img).load((loader, resources) => {
        const pixiBody = (entity.pixiBody = new PIXI.Sprite(resources[entity.props.img]))
        pixiBody.x = entity.position.x
        pixiBody.y = entity.position.y
        pixiBody.width = entity.position.width
        pixiBody.height = entity.position.height
      })
    } else {
      console.warn('Entity missing image')
    }
  }
  getAutoSize() {
    return this.pixiHolder.getBoundingClientRect()
  }
  render() {
    onMount(() => {
      window.pixi = this.pixiApp = new PIXI.Application({
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
    })
    document.body.style.overflow = 'hidden'
    return <div ref={this.pixiHolder}></div>
  }
}

export default PixiRenderer

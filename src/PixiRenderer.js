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
  }
  getAutoSize() {
    return this.pixiHolder.getBoundingClientRect()
  }
  render() {
    //document.body.appendChild(app.view)
    onMount(() => {
      //   const bounding = this.pixiHolder.getBoundingClientRect()
      //   if (!this.pixiProps.hasOwnProperty('width')) {
      //     this.pixiProps.width = bounding.width
      //   }
      //   if (!this.pixiProps.hasOwnProperty('height')) {
      //     this.pixiProps.height = bounding.height
      //   }
      //if (!this.pixiProps.hasOwnProperty('resizeTo')) this.pixiProps.resizeTo = this.pixiHolder
      window.pixi = this.pixiApp = new PIXI.Application({
        ...this.pixiProps,
        width: window.innerWidth,
        height: window.innerHeight
      })
      this.pixiHolder.appendChild(this.pixiApp.view)
      const resize = () => {
        // Resize the renderer
        this.pixiApp.renderer.resize(window.innerWidth, window.innerHeight)
      }
      window.addEventListener('resize', resize)
      //this.pixiApp.resizeTo = this.pixiHolder
    })
    document.body.style.overflow = 'hidden'
    return <div style="height: 100vh; width: 100vw;" ref={this.pixiHolder}></div>
  }
}

export default PixiRenderer

import autoBind from 'auto-bind'
import { Sprite, Texture } from 'pixi.js'
import Entity from '../classes/Entity'

class PixiEntity extends Entity {
  constructor(position = {}, props = {}) {
    super(position, props)
    autoBind(this)
    if (typeof props.img == 'string') {
      const texture = Texture.from(props.img)
      //console.log(this.levelContainer.children)
      this.pixiBody = new Sprite(texture)
      //this.events.on('position', this.setPixiPosition)
      //this.levelContainer.addChild(pixiBody)
    } else {
      this.pixiBody = new Sprite()
      console.warn('Entity missing image')
    }
    this.renderer = null
  }
  setPixiPosition() {
    const renderer = this?.engine?.renderer
    if (!renderer) return console.warn("Couldn't find renderer :(")
    //if (renderer === null) return console.warn('Cannot set position, missing renderer')
    //console.log('f', renderer, this.position, this.pixiBody)
    const pixiBody = this.pixiBody
    pixiBody.anchor.set(this.position.anchorX, this.position.anchorY)
    pixiBody.x = renderer.getRealX(this.position.x)
    pixiBody.y = renderer.getRealY(this.position.y)
    pixiBody.width = renderer.getRealX(this.position.width)
    pixiBody.height = renderer.getRealY(this.position.height)
    pixiBody.angle = this.position.rotation

    //console.log(entity.position)
  }
}

export default PixiEntity

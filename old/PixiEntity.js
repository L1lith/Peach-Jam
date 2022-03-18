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
}

export default PixiEntity

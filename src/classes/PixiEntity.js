import autoBind from 'auto-bind'
import Entity from './Entity'

class PixiEntity extends Entity {
  constructor() {
    super(this)
    autoBind(this)
    this.pixiBody = null
    this.addEntity = this.addEntity.bind(this)
    this.setPixiPosition = this.setPixiPosition.bind(this)
  }
  addEntity(entity) {
    if (typeof entity.props.img == 'string') {
      const texture = Texture.from(entity.props.img)
      const pixiBody = (this.pixiBody = new Sprite(texture))
      entity.this.levelContainer.addChild(pixiBody)
      //console.log(this.levelContainer.children)
      entity.events.on('position', this.setPixiPosition)
    } else {
      console.warn('Entity missing image')
    }
  }
  setPixiPosition() {
    const pixiBody = this.pixiBody
    if ((pixiBody = null)) {
      console.warn('Pixi body not yet registered')
    }
    pixiBody.anchor.set(entity.position.anchorX, entity.position.anchorY)
    pixiBody.x = this.getRealX(entity.position.x)
    pixiBody.y = this.getRealY(entity.position.y)
    pixiBody.width = this.getRealX(entity.position.width)
    pixiBody.height = this.getRealY(entity.position.height)
    pixiBody.angle = entity.position.rotation
    //console.log(entity.position)
  }
}

export default PixiEntity

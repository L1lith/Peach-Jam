import PhysicsEngine from '../classes/PhysicsEngine'
import { HardBody, Immovable } from '../boiler/PhysicsModes'
import { Rectangle } from '../boiler/PhysicsShapes'
import autoBind from 'auto-bind'
import { Engine, Composite, Bodies, Body } from 'matter-js'

class MatterEngine extends PhysicsEngine {
  constructor(props = {}) {
    super(props)
    autoBind(this)
  }
  resetPhysics() {
    super.resetPhysics()
    this.engine = Engine.create()
    this.engine.gravity.x = this.props.gravity.x
    this.engine.gravity.y = this.props.gravity.y
  }
  addEntity(entity) {
    super.addEntity(entity)
    const { shape, body, movement, options = {} } = entity.physics
    let targetShape
    if (shape === Rectangle) {
      targetShape = 'rectangle'
    } else {
      throw new Error('Unsupported shape')
    }
    if (body !== HardBody) throw new Error('Hard bodies only')
    if (movement === Immovable) options.isStatic = true
    const { position } = entity
    const physicsBody = (entity.physicsBody = Bodies[targetShape](
      position.x,
      position.y,
      position.width,
      position.height,
      options
    ))
    Body.setVelocity(physicsBody, { x: position.xVelocity, y: position.yVelocity })
    entity.events.on('position', (diff, position, source) => {
      if (source !== 'physics') {
        Body.setPosition(physicsBody, { x: position.x, y: position.y })
        Body.setVelocity(physicsBody, { x: position.xVelocity, y: position.yVelocity })
      }
    })
    Composite.add(this.engine.world, [physicsBody])
  }
  getBoundedX(x) {
    const [min, max] = this.props.worldBounds.x
    return Math.max(Math.min(x, max), min)
  }
  getBoundedY(y) {
    const [min, max] = this.props.worldBounds.y
    return Math.max(Math.min(y, max), min)
  }
  addLayer(layer, deep = true) {
    layer.entities.forEach(entity => {
      if (!entity.hasPhysics) return
      this.addEntity(entity)
    })
    if (deep) {
      layer.layers.forEach(childLayer => {
        this.addLayer(childLayer, true)
      })
      layer.events.on('addEntity', childEntity => {
        //console.log(childEntity, childEntity.hasPhysics)
        if (!childEntity.hasPhysics) return
        this.addEntity(childEntity)
      })
    }
  }
  doMount() {}
  doPhysicsTick(delta) {
    Engine.update(this.engine, delta)
    this.entities.forEach(entity => {
      const physicsBody = entity.physicsBody
      entity.setPosition(
        {
          x: physicsBody.position.x,
          y: physicsBody.position.y,
          xVelocity: physicsBody.velocity.x,
          yVelocity: physicsBody.velocity.y
        },
        'physics'
      )
    })
  }
}

export default MatterEngine

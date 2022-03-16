import autoBind from 'auto-bind'
import PhysicsEngine from './PhysicsEngine'
import RenderEngine from './RenderEngine'
import Entity from './Entity'

class GameEngine {
  constructor() {
    //if (typeof renderFunction != 'function') throw new Error('Please supply a render function')
    //this.renderer = renderFunction
    const physics = (this.physics = this.constructor.hasOwnProperty('Physics')
      ? this.constructor.Physics
      : null)
    if (physics !== null && !(physics instanceof PhysicsEngine))
      throw new Error('Invalid Physics Engine Supplied. Expected a PhysicsEngine instance or null')

    const renderer = (this.renderer = this.constructor.hasOwnProperty('Renderer')
      ? this.constructor.Renderer
      : null)
    if (renderer !== null && !(renderer instanceof RenderEngine))
      throw new Error('Expected a render engine instance')
    autoBind(this)
  }
  static Entity = Entity
  createEntity(position, props) {
    return new this.constructor.Entity(position, props, this)
  }
  addEntity(entity) {
    //console.log(this.renderer, entity.isRendered, entity)
    if (entity.hasPhysics && this.physics) this.physics.addEntity(entity)
    if (entity.isRendered && this.renderer) this.renderer.addEntity(entity)
  }
  removeEntity(entity) {
    if (entity.hasPhysics && this.physics) this.physics.removeEntity(entity)
    if (entity.isRendered && this.renderer) this.renderer.removeEntity(entity)
  }
}

export default GameEngine

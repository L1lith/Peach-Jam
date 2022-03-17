import autoBind from 'auto-bind'
import PhysicsEngine from './PhysicsEngine'
import RenderEngine from './RenderEngine'
import Entity from './Entity'
import Layer from './Layer'

class GameEngine {
  constructor() {
    //if (typeof renderFunction != 'function') throw new Error('Please supply a render function')
    //this.renderer = renderFunction
    autoBind(this)
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
    this.clear()
  }
  clear() {
    this.rootLayer = new Layer()
    this.addEntity = this.rootLayer.addEntity
    this.removeEntity = this.rootLayer.removeEntity
  }
}

export default GameEngine

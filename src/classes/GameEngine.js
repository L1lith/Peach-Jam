import autoBind from 'auto-bind'
import PhysicsEngine from './PhysicsEngine'
import RenderEngine from './RenderEngine'
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
    this.root = null
  }
  static type = 'GameEngine'
  // clear() {
  //   this.root = new Layer(null, this.renderer)
  //   this.addEntity = this.root.addEntity
  //   this.removeEntity = this.root.removeEntity
  // }
}

export default GameEngine

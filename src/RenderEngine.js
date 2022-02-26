import autoBind from 'auto-bind'
import { createContext } from 'solid-js'
import PhysicsEngine from './PhysicsEngine'

export const RenderEngineContext = createContext(null)

class RenderEngine {
  constructor(physicsEngine = null) {
    //if (typeof renderFunction != 'function') throw new Error('Please supply a render function')
    if (physicsEngine !== null && !(physicsEngine instanceof PhysicsEngine))
      throw new Error('Invalid Physics Engine Supplied. Expected a PhysicsEngine instance or null')
    //this.renderer = renderFunction
    this.physics = physicsEngine
    // this.parent = null
    // this.container = document.createElement('div')
    // this.container.className = 'renderer'
    autoBind(this)
  }
  doGameTick(delta = 0) {
    if (this.physics && delta !== 0) {
      await this.physics.doPhysicsTick(this.entities, delta)
    }
  }
  render() {
    return null
  }
}

export default RenderEngine

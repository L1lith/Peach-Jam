import autoBind from 'auto-bind'
import { createContext } from 'solid-js'
import PhysicsEngine from './PhysicsEngine'
import Entity from './Entity'

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
    this.clearEntities()
    autoBind(this)
  }
  static Entity = Entity
  doGameTick(delta = 0) {
    if (this.physics && delta !== 0) {
      this.physics.doPhysicsTick(this.entities, delta)
    }
  }
  render() {
    return null
  }
  clearEntities() {
    this.entities = new WeakSet()
  }
  createEntity(props) {
    return new this.constructor.Entity(props, this)
  }
  addEntity(entity) {
    this.entities.add(entity)
    if (this.physics && entity.hasPhysics) this.physics.addEntity(entity)
  }
  removeEntity(entity) {
    this.entities.delete(entity)
    if (this.physics && entity.hasPhysics) this.physics.removeEntity(entity)
  }
}

export default RenderEngine

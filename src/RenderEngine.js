import autoBind from 'auto-bind'
import { createContext } from 'react'
import PhysicsEngine from './PhysicsEngine'

export const RenderEngineContext = createContext(null)

class Entity {
  constructor(props) {
    Object.assign(this, props)
  }
}

class RenderEngine {
  constructor(renderFunction, physicsEngine = null) {
    if (typeof renderFunction != 'function') throw new Error('Please supply a render function')
    if (physicsEngine !== null && !(physicsEngine instanceof PhysicsEngine))
      throw new Error('Invalid Physics Engine Supplied. Expected a PhysicsEngine instance or null')
    this.renderer = renderFunction
    this.physics = physicsEngine
    this.parent = null
    this.container = document.createElement('div')
    this.container.className = 'renderer'
    this.clearEntities()
    autoBind(this)
  }
  async doGameTick(delta = 0) {
    if (this.physics && delta !== 0) {
      await this.physics.doPhysicsTick(this.entities, delta)
    }
  }
  mount(levelElement) {
    this.parent = levelElement
    this.parent.addChild(this.container)
  }
  unmount() {
    this.parent.removeChild(this.container)
    this.parent = null
  }
  async render() {
    await this.renderer(this.entities)
  }
  clearEntities() {
    this.entities = []
  }
  addEntity(props) {
    const entity = new Entity(props)
    this.entities.push(entity)
    return true
  }
  removeEntity(entity) {
    const index = this.entities.indexOf(entity)
    if (index < 0) return false
    this.entities.splice(index, 1)
    return true
  }
}

export default RenderEngine

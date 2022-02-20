import autoBind from 'auto-bind'
import { createContext } from 'react'
import PhysicsEngine from './PhysicsEngine'
import coordinateFormat from './formats/coordinate'
import positionFormat from './formats/position'
import { sanitize } from 'sandhands'

export const RenderEngineContext = createContext(null)

class Entity {
  constructor(position, physics = null) {
    sanitize(position, positionFormat)
    this.position = position
    this.physics = physics
    if (physics !== null) physics.addEntity(this)
  }
  destroy() {
    if (physics !== null) this.physics.removeEntity(this)
  }
  setX(x) {
    sanitize(x, coordinateFormat)
    this.position.x = x
    this.physics.updateEntity(this)
  }
  setY(y) {
    sanitize(y, coordinateFormat)
    this.position.y = y
    this.physics.updateEntity(this)
  }
  setPosition(x, y) {
    sanitize(x, coordinateFormat)
    sanitize(y, coordinateFormat)
    this.position.x = x
    this.position.y = y
    this.physics.updateEntity(this)
  }
  updatePhysics() {
    this.physics.updateEntity(this)
  }
}

class RenderEngine {
  constructor(renderFunction, physicsEngine = null) {
    if (typeof renderFunction != 'function') throw new Error('Please supply a render function')
    if (physicsEngine !== null && !(physicsEngine instanceof PhysicsEngine))
      throw new Error('Invalid Physics Engine Supplied. Expected a PhysicsEngine instance or null')
    this.renderer = renderFunction
    this.physics = physicsEngine
    // this.parent = null
    // this.container = document.createElement('div')
    // this.container.className = 'renderer'
    this.clearEntities()
    autoBind(this)
  }
  async doGameTick(delta = 0) {
    if (this.physics && delta !== 0) {
      await this.physics.doPhysicsTick(this.entities, delta)
    }
  }
  async render() {
    await this.renderer(this.entities)
  }
  clearEntities() {
    this.entities = []
  }
  addEntity(props) {
    const entity = new Entity(props, this.physics)
    this.entities.push(entity)
    return true
  }
  removeEntity(entity) {
    const index = this.entities.indexOf(entity)
    if (index < 0) return false
    const entity = this.entities[index]
    this.entities.splice(index, 1)
    entity.destroy()
    return true
  }
}

export default RenderEngine

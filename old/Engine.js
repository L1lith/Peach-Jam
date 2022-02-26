import { sanitize } from 'sandhands'
import autoBind from 'auto-bind'
import PhysicsPlugin from './PhysicsPlugin'
import RendererPlugin from '../src/RendererPlugin'
import { createContext } from 'solid-js'

const optionsFormat = {
  _: {
    withPhysics: Boolean
  },
  allOptional: true
}

const defaultOptions = Object.freeze({
  withPhysics: false
})

export const EngineContext = createContext(null)

class Engine {
  constructor(...args) {
    autoBind(this)
    if (args.length > 3) throw new Error('Got too many arguments')
    if (args.length < 1 || !(args[0] instanceof RendererPlugin))
      throw new Error('Please supply a renderer plugin')
    let options = null,
      physicsPlugin = null
    if (args.length === 2) {
      if (args[1] instanceof PhysicsPlugin) {
        physicsPlugin = args[1]
      } else {
        options = args[1]
      }
    } else if (args.length === 3) {
      physicsPlugin = args[1]
      if (!physicsPlugin instanceof PhysicsPlugin) throw new Error('Invalid Physics Plugin')
      options = args[2]
    }
    if (options === null) {
      this.options = defaultOptions
    } else {
      if (typeof options != 'object') throw new Error('Expected the options to be an object')
      options = Object.freeze({ ...defaultOptions, options })
      sanitize(options, optionsFormat)
      this.options = options
    }
    this.physics = physicsPlugin
  }
  addEntity() {}
  renderTo(element) {
    if (!element instanceof HTMLElement) throw new Error('Please supply an HTML element')
    // TODO: Render the game
  }
  render() {}
}

export default Engine

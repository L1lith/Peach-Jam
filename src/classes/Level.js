import GameEngine from './GameEngine'
import EngineContext from '../boiler/EngineContext'
import { splitProps } from 'solid-js'
//import useHasMounted from '../hooks/useHasMounted'
import { isServer } from 'solid-js/web'
import autoBind from 'auto-bind'
import PhysicsEngine from './PhysicsEngine'
import RenderEngine from './RenderEngine'
import Layer from './Layer'
import Emitter from './Emitter'

class Level {
  constructor(renderer, physics = null) {
    //if (!(engine instanceof GameEngine)) throw new Error('Invalid Game Engine!')
    // const physics = (this.physics = this.constructor.hasOwnProperty('Physics')
    //   ? this.constructor.Physics
    //   : null)
    if (!(renderer instanceof RenderEngine))
      throw new Error('Expected a valid render engine instance')
    if (physics !== null && !(physics instanceof PhysicsEngine))
      throw new Error('Invalid Physics Engine Supplied. Expected a PhysicsEngine instance or null')
    autoBind(this)
    this.renderer = renderer
    this.physics = physics
    this.clear()
  }
  static type = 'Level'
  clear() {
    this.root = new Layer({}, null, this.renderer)
    this.addLayer = this.root.addLayer
    this.removeLayer = this.root.removeLayer
    this.events = new Emitter()
    this.events.emit('setRoot', this.root)
    if (this.physics) {
      this.physics.resetPhysics()
      this.physics.addLayer(this.root)
    }
  }
  doRender(props = {}) {
    //const hasMounted = useHasMounted()
    const [local, attributes] = splitProps(
      // Here we pass the attributes from the props
      props,
      ['engine', 'children']
    )
    return (
      <div {...attributes} className="level">
        {local.children || null}
        {this.renderer.doRender(this.root)}
      </div>
    )
  }
}

export default Level

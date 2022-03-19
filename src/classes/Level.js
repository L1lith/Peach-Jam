import GameEngine from './GameEngine'
import EngineContext from '../boiler/EngineContext'
import { splitProps } from 'solid-js'
//import useHasMounted from '../hooks/useHasMounted'
import { isServer } from 'solid-js/web'
import autoBind from 'auto-bind'
import Layer from './Layer'
import Emitter from './Emitter'

class Level {
  constructor(engine) {
    if (!(engine instanceof GameEngine)) throw new Error('Invalid Game Engine!')
    autoBind(this)
    this.engine = engine
    this.events = new Emitter()
    this.clear()
  }
  clear() {
    this.engine.root = this.root = new Layer({}, null, this.engine)
    this.addLayer = this.root.addLayer
    this.removeLayer = this.root.removeLayer
    this.events.emit('setRoot', this.root)
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
        {this.engine.renderer.doRender(this.root)}
      </div>
    )
  }
}

export default Level

import { RenderEngineContext, default as RenderEngine } from './RenderEngine'
import EngineContext from './boiler/EngineContext'
import { splitProps } from 'solid-js'
import rendererEngineFormat from './formats/rendererEngine'
import physicsEngineFormat from './formats/physicsEngine'
import DummyPhysicsEngine from './DummyPhysicsEngine'
import PhysicsEngine from './PhysicsEngine'

function Level(props) {
  //sanitize(props, propsFormat)
  const [local, attributes] = splitProps(
    // Here we pass the attributes from the props
    props,
    ['physics', 'renderer']
  )
  const physics =
    typeof local.physics == 'object' && local.physics !== null ? new local.physics() : null
  const renderer =
    typeof local.renderer == 'object' && local.renderer !== null
      ? new local.renderer(physics)
      : null
  window.physics = physics
  window.renderer = renderer
  if (physics !== null && !(physics instanceof PhysicsEngine))
    throw new Error('Expected a physics engine instance')
  if (renderer !== null && !(renderer instanceof RenderEngine))
    throw new Error('Expected a render engine instance')
  return (
    <EngineContext.Provider value={renderer}>
      <div {...attributes} className="level">
        {props.children || null}
      </div>
    </EngineContext.Provider>
  )
}

export default Level

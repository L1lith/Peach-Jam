import { RenderEngineContext, default as RenderEngine } from './RenderEngine'
import EngineContext from './boiler/EngineContext'
import getComponentAttributes from './functions/getComponentProps'
import rendererEngineFormat from './formats/rendererEngine'
import physicsEngineFormat from './formats/physicsEngine'
import DummyPhysicsEngine from './DummyPhysicsEngine'
import PhysicsEngine from './PhysicsEngine'

function Level(props) {
  //sanitize(props, propsFormat)
  const attributes = getComponentAttributes(
    // Here we pass the attributes from the props
    props,
    Object.keys(
      [
        'physics',
        'renderer'
      ] /* Don't pass any props meant for the Level, based on the propsFormat */
    )
  )
  const physics = new (props.physics || PhysicsEngine)()
  const renderer = new (props.renderer || RenderEngine)(physics)
  if (!(physics instanceof PhysicsEngine)) throw new Error('Expected a physics engine instance')
  if (!(renderer instanceof RenderEngine)) throw new Error('Expected a render engine instance')
  return (
    <EngineContext.Provider value={{ renderer, physics }}>
      <div {...attributes} className="level">
        {props.children || null}
      </div>
    </EngineContext.Provider>
  )
}

export default Level

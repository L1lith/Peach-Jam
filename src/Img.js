import { useContext, createSignal, createEffect, onCleanup, onMount } from 'solid-js'
import EngineContext from './boiler/EngineContext'
import useIsServer from './functions/useIsServer'
import positionFormat from './formats/position'
import getComponentAttributes from './functions/getComponentProps'

function Img(props) {
  //sanitize(props, propsFormat)
  console.log(props)
  const engine = useContext(EngineContext)
  const isServer = useIsServer()
  const [entity, setEntity] = createSignal(null)
  const attributes = getComponentAttributes(props, ['x', 'y', 'width', 'height', 'style'])
  attributes.style = {
    position: 'absolute',
    left: (props.hasOwnProperty('x') ? props.x : 0) + '%',
    top: (props.hasOwnProperty('y') ? props.y : 0) + '%',
    width: (props.hasOwnProperty('width') ? props.width : 100) + '%',
    height: (props.hasOwnProperty('height') ? props.height : 100) + '%'
  }
  if (props.hasOwnProperty('style')) attributes.style = { ...attributes.style, ...props.style }
  createEffect(() => {
    if (engine && !entity) setEntity(engine.physics.addEntity(props))
  })
  onCleanup(() => {
    if (entity) {
      engine.physics.removeEntity(entity)
    }
  })
  if (!isServer) return null
  return <img href={props.href} {...attributes}></img>
}

export default Img

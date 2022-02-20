import { useContext } from 'react'
import { EngineContext } from '../old/Engine'
import useIsServer from './functions/useIsServer'
import { sanitize } from 'sandhands'
import positionFormat from './formats/position'
import getComponentAttributes from './functions/getComponentProps'

const propsFormat = { ...positionFormat, href: String }

function Img(props) {
  sanitize(props, propsFormat)
  const engine = useContext(EngineContext)
  const isServer = useIsServer()
  const [entity, setEntity] = useState(null)
  const attributes = getComponentAttributes(props, Object.keys(propsFormat))
  attributes.style = {
    position: 'absolute',
    left: (entity?.x || 0) + '%',
    top: (entity?.y || 0) + '%',
    width: (entity?.width || 100) + '%',
    height: (entity?.height || 100) + '%'
  }
  if (props.hasOwnProperty('style')) props.style = { ...attributes.style, ...props.style }
  useEffect(() => {
    let entity = null
    if (engine) {
      entity = engine.addEntity(props)
      setEntity()
    }
    return () => {
      engine.removeEntity(entity)
    }
  }, [engine])
  if (!isServer) return null
  return <img href={props.href} {...attributes}></img>
}

export default Img

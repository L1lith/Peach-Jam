import GameEngine from './GameEngine'
import EngineContext from './boiler/EngineContext'
import { splitProps } from 'solid-js'
import useHasMounted from './functions/useHasMounted'
import { isServer } from 'solid-js/web'

function Level(props) {
  //sanitize(props, propsFormat)
  const hasMounted = useHasMounted()
  const [local, attributes] = splitProps(
    // Here we pass the attributes from the props
    props,
    ['engine', 'children']
  )
  const engine = typeof local.engine == 'function' ? new local.engine() : null
  if (engine === null || !(engine instanceof GameEngine))
    throw new Error('Please supply a valid GameEngine class')
  const children = () => {
    const providedChildren = local.children || null
    if (isServer) {
      return providedChildren
    } else {
      return engine.renderer ? engine.renderer.doRender(providedChildren) : providedChildren
    }
  }
  return (
    <EngineContext.Provider value={engine}>
      <div {...attributes} className="level">
        {children()}
      </div>
    </EngineContext.Provider>
  )
}

export default Level

import GameEngine from './GameEngine'
import EngineContext from './boiler/EngineContext'
import { splitProps } from 'solid-js'
import useHasMounted from './functions/useHasMounted'

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
    return !hasMounted || engine.renderer === null
      ? providedChildren
      : engine.renderer.render(providedChildren)
  }
  console.log({ engine })
  return (
    <EngineContext.Provider value={engine}>
      <div {...attributes} className="level">
        {children()}
      </div>
    </EngineContext.Provider>
  )
}

export default Level

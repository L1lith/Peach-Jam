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
    ['engine']
  )
  const engine =
    typeof local.engine == 'object' && local.engine !== null ? new local.engine(physics) : null
  window.engine = engine
  if (engine === null || !(engine instanceof GameEngine))
    throw new Error('Please supply a valid GameEngine class')
  return (
    <EngineContext.Provider value={engine}>
      <div {...attributes} className="level">
        {!hasMounted || !engine.hasOwnProperty('renderer')
          ? props.children || null
          : engine.renderer.render()}
      </div>
    </EngineContext.Provider>
  )
}

export default Level

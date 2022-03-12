import EngineContext from '../boiler/EngineContext'
import { onMount, onCleanup, useContext, createSignal } from 'solid-js'

function useEntity(props) {
  const engine = useContext(EngineContext)
  const entity = engine.createEntity(props)

  onMount(() => {
    engine.addEntity(entity)
  })
  onCleanup(() => {
    engine.removeEntity(entity)
  })
  return entity
}

export default useEntity

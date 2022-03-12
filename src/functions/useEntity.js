import EngineContext from '../boiler/EngineContext'
import { onMount, onCleanup, useContext, createSignal } from 'solid-js'

function useEntity(position, props) {
  const engine = useContext(EngineContext)
  const entity = engine.createEntity(position, props)
  console.log(position, props)

  onMount(() => {
    engine.addEntity(entity)
  })
  onCleanup(() => {
    engine.removeEntity(entity)
  })
  return entity
}

export default useEntity

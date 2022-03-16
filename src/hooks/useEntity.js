import EngineContext from '../boiler/EngineContext'
import { onMount, onCleanup, useContext, createEffect } from 'solid-js'

function useEntity(position, props) {
  const engine = useContext(EngineContext)
  const entity = engine.createEntity(position, props)

  onMount(() => {
    engine.addEntity(entity)
  })
  createEffect(() => {
    entity.setPosition(position)
  })
  onCleanup(() => {
    engine.removeEntity(entity)
  })
  return entity
}

export default useEntity

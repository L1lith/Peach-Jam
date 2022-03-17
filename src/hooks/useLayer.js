import Layer from '../classes/Layer'
import EngineContext from '../boiler/EngineContext'
import { onMount, onCleanup, useContext, createEffect } from 'solid-js'

function useLayer(position, props) {
  const engine = useContext(EngineContext)
  const layer = engine.createLayer(position, props)

  onMount(() => {
    engine.addLayer(layer)
  })
  createEffect(() => {
    layer.setPosition(position)
  })
  onCleanup(() => {
    engine.removeLayer(entity)
  })
  return layer
}

export default useLayer

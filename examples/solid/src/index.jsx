/* @refresh reload */
import { createEffect, createSignal } from 'solid-js'
import { render } from 'solid-js/web'
//import {} from '../../../dist/classes'
import { Level, Entity, Layer } from '../../../dist/classes'
import theForest from './assets/maps/theForest'
import gameEngine from './gameEngine'
import './index.css'
import tomatoImage from './assets/tomato.png'
import { useAnimationFrame, useLayer } from '../../../dist/hooks'

function App() {
  const testLevel = new Level(gameEngine)
  const entity1 = new Entity({}, {})
  testLevel.root.addEntity(entity1)
  return testLevel.doRender()
}

render(App, document.getElementById('root'))

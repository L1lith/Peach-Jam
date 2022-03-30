/* @refresh reload */
import { render } from 'solid-js/web'
//import {} from '../../../dist/classes'
import { Level, Entity, Layer } from '../../../dist/classes'
import gameEngine from './gameEngine'
import './index.css'
import tomatoImage from './assets/tomato.png'
import { useAnimationFrame, useLayer } from '../../../dist/hooks'
import { Movable } from '../../../dist/boiler/PhysicsModes'
import PixiRenderer from '../../../dist/pixi/PixiRenderer'
import MatterEngine from '../../../dist/matter/MatterEngine'
import theForest from './assets/maps/theForest'

function App() {
  //window.gameEngine = gameEngine
  const testLevel = new Level(new PixiRenderer(), new MatterEngine({gravity: {y: 0}}))
  const entity1 = new Entity({x: 0, y: 0, width: 50, height: 50}, {img: tomatoImage, physics: {}})
  const entity2 = new Entity({x: 75, y: 15, width: 10, height: 10}, {img: tomatoImage, physics: {movement: Movable}})
  theForest.root.zIndex = -10
  testLevel.root.sortableChildren = true
  testLevel.root.addLayer(theForest.root)
  // setInterval(()=>{
  //   entity2.setPosition({y: 25, yVelocity: 0})
  // }, 1000)
  window.entity1 = entity1
  window.entity2 = entity2
  testLevel.root.addEntity(entity1)
  testLevel.root.addEntity(entity2)
  useAnimationFrame(({delta}) => {
    testLevel.physics.doPhysicsTick(delta)
  })
  return testLevel.doRender()
}

render(App, document.getElementById('root'))

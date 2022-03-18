/* @refresh reload */
import {createEffect, createSignal} from 'solid-js'
import { render } from 'solid-js/web';
//import {} from '../../../dist/classes'
import {Level, Layer, Entity} from '../../../dist/pixi'
import testMap from './assets/maps/test'
import gameEngine from './gameEngine';
import './index.css';
import tomatoImage from './assets/tomato.png'
import {useAnimationFrame, useLayer} from '../../../dist/hooks'

const xSpeed = 0.05
const squishSpeed = 0.05
const maxHeight = 50
const minHeight = 10
const rotationSpeed = 0.04

function App() {
    const [x, setX] = createSignal(0)
    const [height, setHeight] = createSignal(maxHeight)
    const [rotation, setRotation] = createSignal(0)
    useAnimationFrame(({time, delta})=>{
        setX((time * xSpeed) % 70)
        let newHeight = height() - ((delta * squishSpeed))
        if (newHeight < minHeight) {
            while (newHeight <= (maxHeight - minHeight)) newHeight += minHeight 
        }
        setHeight(newHeight)
        setRotation((time * rotationSpeed) % 360)
    })
    setInterval(()=>{
        //console.log(x())
    }, 20)
    const tomato = new Entity({}, {img: tomatoImage})
    const testLevel = new Level(gameEngine)
    testLevel.root.addEntity(tomato)
    createEffect(() => {
        tomato.setPosition({x: x(), height: height(), rotation: rotation()})
    })
    return testLevel.doRender()
}

render(App, document.getElementById('root'));
/* @refresh reload */
import {createEffect, createSignal} from 'solid-js'
import { render } from 'solid-js/web';
import {Level, Img} from '../../../dist/index'
import GameEngine from './GameEngine';
import './index.css';
import tomatoImage from './assets/tomato.png'
import useAnimationFrame from '../../../dist/functions/useAnimationFrame'

const xSpeed = 0.05

function App() {
    const [x, setX] = createSignal(0)
    useAnimationFrame(({time})=>{
        setX((time * xSpeed) % 50)
    })
    setInterval(()=>{
        //console.log(x())
    }, 20)
    return <Level engine={GameEngine}><Img src={tomatoImage} x={x()}/></Level>
}

render(App, document.getElementById('root'));
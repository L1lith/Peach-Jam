/* @refresh reload */
import {createEffect, createSignal} from 'solid-js'
import { render } from 'solid-js/web';
import {Level, Img} from '../../../dist/index'
import GameEngine from './GameEngine';
import './index.css';
import tomatoImage from './assets/tomato.png'

function App() {
    const [x, setX] = createSignal(0)
    setInterval(()=>{
        setX((x() + 1) % 50)
        //console.log(x())
    }, 50)
    return <Level engine={GameEngine}><Img src={tomatoImage} x={x()}/></Level>
}

render(App, document.getElementById('root'));
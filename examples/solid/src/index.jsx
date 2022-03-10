/* @refresh reload */
import {createEffect, createSignal} from 'solid-js'
import { render } from 'solid-js/web';
import {Level, Img} from '../../../dist/index'

import './index.css';

function App() {
    const [x, setX] = createSignal(0)
    setInterval(()=> {
        setX((x() + 1) % 50)
        //console.log('x', x())
    }, 100)
    return <Level><Img x={x()}/></Level>
}

render(App, document.getElementById('root'));
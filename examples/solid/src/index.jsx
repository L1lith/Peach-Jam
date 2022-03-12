/* @refresh reload */
import {createEffect, createSignal} from 'solid-js'
import { render } from 'solid-js/web';
import {Level, Img} from '../../../dist/index'
import GameEngine from './GameEngine';
import './index.css';

function App() {
    return <Level engine={GameEngine}><Img src="/tomato.jpg" x={0}/></Level>
}

render(App, document.getElementById('root'));
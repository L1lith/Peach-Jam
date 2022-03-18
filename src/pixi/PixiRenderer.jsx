import { Loader, Sprite, Application, Texture, Container, utils } from 'pixi.js'
import { onMount } from 'solid-js'
import autoBind from 'auto-bind'
import Layer from '../classes/Layer'
//import PixiLayer from './PixiLayer'

import RenderEngine from '../classes/RenderEngine'

utils.skipHello() // Disable the Pixi banner in console

function createPixiBody(entity) {
  if ('pixiBody' in entity) return
  const {props} = entity
  let pixiBody
  if (typeof props.img == 'string') {
    const texture = Texture.from(props.img)
    pixiBody = entity.pixiBody = new Sprite(texture)
  } else if (props.img?.type == 'sprite') {
    
  } else {
    pixiBody = entity.pixiBody = new Sprite()
    console.warn('Entity missing image')
  }
  return pixiBody
}
var logged = false
function setPixiPosition(renderer, entity, position) {
  if (!renderer) return console.warn("Couldn't find renderer :(")
  if (!position) position = entity.position
  createPixiBody(entity)
  const pixiBody = entity.pixiBody
  if (logged = false) console.log(pixiBody)
  logged = true
  if ('anchorX' in position || 'anchorY' in position) pixiBody.anchor.set(position.anchorX, position.anchorY)
  if ('x' in position) pixiBody.x = renderer.getRealX(position.x)
  if ('y' in position) pixiBody.y = renderer.getRealY(position.y)
  if ('width' in position) pixiBody.width = renderer.getRealX(position.width)
  if ('height' in position) {
    //console.log('setting height', renderer.getRealY(position.height), pixiBody)
    pixiBody.height = renderer.getRealY(position.height)
    //console.log(position.height, renderer.getRealY(position.height), pixiBody.height)
  }
  if ('rotation' in position) pixiBody.angle = position.rotation
}

class PixiRenderer extends RenderEngine {
  constructor(pixiProps = {}) {
    super()
    autoBind(this)
    this.pixiProps = pixiProps
  }
  attachPixi(layer, parent) {
    if (!(layer instanceof Layer) && layer.constructor.name !== 'Layer') throw new Error("That's not a layer wtf")
    if (!layer.container) layer.container = new Container()
    if (parent) {
      //console.log(parent.constructor, parent.addChild)
      parent.addChild(layer.container)
    }
    layer.entities.forEach(entity => {
      //entity.setPixiPosition()
      setPixiPosition(this, entity)
      layer.container.addChild(entity.pixiBody)
      entity.events.on('position', position => {
        setPixiPosition(this, entity, position)
        //console.log(entity.pixiBody.height)
      })
    })
    layer.events.on('addEntity', childEntity => {
      setPixiPosition(this, entity)
      layer.container.addChild(childEntity.pixiBody)
    })
    layer.events.on('removeEntity', childEntity => {
      layer.container.removeChild(childEntity.pixiBody)
    })
    layer.layers.forEach(childLayer => {
      this.attachPixi(childLayer, layer.container)
    })
    layer.events.on('addLayer', childLayer => {
      this.attachPixi(childLayer, layer.container)
    })
    layer.events.on('removeLayer', childLayer => {
      layer.container.removeChild(childLayer.container)
    })
  }
  
  getRealX(x) {
    return (x / 100) * this.width
  }
  getRealY(y) {
    return (y / 100) * this.height
  }
  getAutoSize() {
    return this.pixiHolder.getBoundingClientRect()
  }
  doMount() {
      window.pixi = this.pixiApp = new Application({
        ...this.pixiProps,
        width: window.innerWidth,
        height: window.innerHeight
      })
      this.width = window.innerWidth
      this.height = window.innerHeight
      //this.pixiHolder.appendChild(this.pixiApp.view)
      const resize = () => {
        // Resize the renderer
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.pixiApp.renderer.resize(window.innerWidth, window.innerHeight)
      }
      window.addEventListener('resize', resize)
      this.setRoot(this.root)
      this.pixiHolder.appendChild(this.pixiApp.view)
  }
  doRender(root) {
    this.root = root
    onMount(this.doMount)
    document.body.style.overflow = 'hidden'
    return <div ref={this.pixiHolder}></div>
  }
  setRoot(layer) {
    if (!(layer instanceof Layer)) throw new Error("Expected a valid layer")
    const pixiApp = this.pixiApp
    for(let i = 0, l = pixiApp.stage.children.length; i < l; i++) {
      const child = pixiApp.stage.children[i]
      pixiApp.stage.removeChild(child)
    }
    this.attachPixi(layer, pixiApp.stage)
    pixiApp.stage.addChild(layer.container)
  }
  loadImage(url) {}
}

export default PixiRenderer

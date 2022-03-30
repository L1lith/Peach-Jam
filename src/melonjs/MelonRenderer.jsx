import {
  Loader,
  Sprite,
  Application,
  Texture,
  Container,
  utils,
  Rectangle,
  settings,
  SCALE_MODES
} from 'pixi.js'
import { onMount } from 'solid-js'
import autoBind from 'auto-bind'
import Layer from '../classes/Layer'
import isInstance from '../functions/isInstance'
//import PixiLayer from './PixiLayer'

import RenderEngine from '../classes/RenderEngine'

settings.SCALE_MODE = SCALE_MODES.NEAREST
utils.skipHello() // Disable the Pixi banner in console

function createPixiBody(entity) {
  if ('pixiBody' in entity) return
  const { props } = entity
  let pixiBody
  const { img } = props
  if (typeof img == 'string') {
    const texture = Texture.from(props.img)
    pixiBody = entity.pixiBody = new Sprite(texture)
  } else if (img?.type == 'sprite') {
    const { spriteSheet } = img
    //console.log(img)
    if (!spriteSheet.texture) spriteSheet.texture = Texture.from(spriteSheet.url)
    const texture = new Texture(
      spriteSheet.texture,
      new Rectangle(img.x, img.y, img.width, img.height)
    )
    pixiBody = entity.pixiBody = new Sprite(texture)
  } else {
    pixiBody = entity.pixiBody = new Sprite()
    console.warn('Entity missing image')
  }
  return pixiBody
}
function setPixiPosition(renderer, entity, position) {
  if (!renderer) return console.warn("Couldn't find renderer :(")
  if (!position) position = entity.position
  createPixiBody(entity)
  const pixiBody = entity.pixiBody
  if ('anchorX' in position || 'anchorY' in position)
    pixiBody.anchor.set(position.anchorX, position.anchorY)
  if ('x' in position) pixiBody.x = renderer.getRealX(position.x)
  if ('y' in position) pixiBody.y = renderer.getRealY(position.y)
  if ('width' in position) pixiBody.width = renderer.getRealX(position.width)
  if ('height' in position) {
    //console.log('setting height', renderer.getRealY(position.height), pixiBody)
    pixiBody.height = renderer.getRealY(position.height)
    //console.log(position.height, renderer.getRealY(position.height), pixiBody.height)
  }
  if (position.horizontallyFlipped || position.diagonallyFlipped) {
    pixiBody.anchor.x = 1
    pixiBody.scale.x = -1
  }
  if (position.verticallyFlipped || position.diagonallyFlipped) {
    pixiBody.anchor.y = 1
    pixiBody.scale.y = -1
  }
  if ('rotation' in position) pixiBody.angle = position.rotation
  // if ('xScale' in position) {
  //   pixiBody.scale.x = position.scaleX

  //   console.log('xScale', position.xScale, pixiBody.scale)
  // }
  // if ('yScale' in position) pixiBody.scale.y = position.scaleY
}

class PixiRenderer extends RenderEngine {
  constructor(pixiProps = {}) {
    super()
    autoBind(this)
    this.pixiProps = pixiProps
  }
  attachPixi(layer, parent) {
    if (!isInstance(layer, Layer)) throw new Error("That's not a layer wtf")
    if (!layer.container) layer.container = new Container()
    if (layer.props.hasOwnProperty('z')) layer.container.zIndex = layer.props.z
    if (parent) {
      //console.log(parent.constructor, parent.addChild)
      parent.addChild(layer.container)
    }
    layer.entities.forEach(entity => {
      //entity.setPixiPosition()
      if (!entity.isRendered) return // Do nothing as it's not rendered
      setPixiPosition(this, entity)
      layer.container.addChild(entity.pixiBody)
      entity.events.on('position', position => {
        setPixiPosition(this, entity, position)
        //console.log(entity.pixiBody.height)
      })
    })
    layer.events.on('addEntity', childEntity => {
      if (!childEntity.isRendered) return // Do nothing as it's not rendered
      setPixiPosition(this, entity)
      layer.container.addChild(childEntity.pixiBody)
    })
    layer.events.on('removeEntity', childEntity => {
      if (!entity.isRendered) return // Do nothing as it's not rendered
      layer.container.removeChild(childEntity.pixiBody)
    })
    layer.layers.forEach(childLayer => {
      this.attachPixi(childLayer, layer.container)
    })
    layer.events.on('addLayer', childLayer => {
      //console.log(childLayer.props)
      this.attachPixi(childLayer, layer.container)
      if (childLayer.props.hasOwnProperty('z')) childLayer.container.zIndex = childLayer.props.z
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
    if (!isInstance(layer, Layer)) throw new Error('Expected a valid layer')
    layer.sortableChildren = true
    const pixiApp = this.pixiApp
    for (let i = 0, l = pixiApp.stage.children.length; i < l; i++) {
      const child = pixiApp.stage.children[i]
      pixiApp.stage.removeChild(child)
    }
    this.attachPixi(layer, pixiApp.stage)
    pixiApp.stage.addChild(layer.container)
  }
  loadImage(url) {}
}

export default PixiRenderer

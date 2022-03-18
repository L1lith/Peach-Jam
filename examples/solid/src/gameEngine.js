import GameEngine from '../../../dist/classes/GameEngine'
import PixiRenderer from '../../../dist/pixi/PixiRenderer'

class OurGameEngine extends GameEngine {
  static Renderer = new PixiRenderer()
}

export default new OurGameEngine()

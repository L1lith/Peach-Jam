import GameEngine from '../../../../dist/GameEngine'
import PixiRenderer from '../../../../dist/PixiRenderer'

class OurGameEngine extends GameEngine {
  static Renderer = new PixiRenderer()
}

export default OurGameEngine

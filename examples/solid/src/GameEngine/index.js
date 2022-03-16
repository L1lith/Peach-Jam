import GameEngine from '../../../../dist/classes/GameEngine'
import PixiRenderer from '../../../../dist/classes/PixiRenderer'

class OurGameEngine extends GameEngine {
  static Renderer = new PixiRenderer()
}

export default OurGameEngine

import GameEngine from '../../../dist/classes/GameEngine'
import PixiRenderer from '../../../dist/pixi/PixiRenderer'
import MatterEngine from '../../../dist/matter/MatterEngine'

class OurGameEngine extends GameEngine {
  static Renderer = new PixiRenderer()
  static Physics = new MatterEngine()
}

export default new OurGameEngine()

import autoBind from 'auto-bind'

import Layer from './Layer'

class GameEngine {
  constructor() {
    autoBind(this)
  }
  static type = 'GameEngine'
}

export default GameEngine

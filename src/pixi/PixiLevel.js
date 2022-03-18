import autoBind from 'auto-bind'
import Level from '../classes/Level'
import PixiLayer from './PixiLayer'

class PixiLevel extends Level {
  constructor(engine) {
    super(engine)
    autoBind(this)
  }
  clear() {
    //console.log('g', this.engine)
    this.engine.root = this.root = new PixiLayer(null, this.engine)
    this.addLayer = this.root.addLayer
    this.removeLayer = this.root.removeLayer
  }
}

export default PixiLevel

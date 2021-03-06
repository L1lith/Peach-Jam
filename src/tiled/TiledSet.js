import Image from '../classes/Image'
import TileSet from '../classes/TileSet'

class TiledSet extends TileSet {
  constructor(
    image /*A single image file to extrapolate from */,
    data /*Tiled format JSON data */
  ) {
    super(image, data)
    this.image = typeof image == 'string' ? new Image(image) : image
    this.data = data
    this.length = data.tilecount
  }
  nthImage(n) {
    if (n < 0) throw new Error('N must be greater than or equal to 0')
    if (n >= this.data.tilecount) throw new Error('Invalid Tile Number, exceeds max for tileset')
    const { tilewidth, tileheight, imagewidth, columns, spacing = 0 } = this.data
    let x = (n % columns) * (tilewidth + spacing)
    let y = Math.floor(n / columns) * (tileheight + spacing)
    return Image.fromSpriteSheet(this.image, x, y, tilewidth, tileheight)
  }
}

export default TiledSet

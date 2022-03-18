import Image from '../classes/Image'
import TileSet from '../classes/TileSet'

class TiledTileSet extends TileSet {
  constructor(
    image /*A single image file to extrapolate from */,
    data /*Tiled format JSON data */
  ) {
    super(image, data)
    this.length = data.tilecount
  }
  nthImage(n) {
    if (n < 0) throw new Error('N must be greater than or equal to 0')
    if (n >= this.data.tilecount) throw new Error('Invalid Tile Number, exceeds max for tileset')
    const { tilewidth, tileheight, imagewidth } = this.data
    const x = n * tilewidth
    let y = 0
    while (x >= imagewidth) {
      y += tileheight
      x -= imagewidth
    }
    return Image.fromSpriteSheet(this.image, x, y, tilewidth, tileheight)
  }
}

export default TiledTileSet

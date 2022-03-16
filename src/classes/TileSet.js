import Image from './Image'

class TileSet {
  constructor(image, data) {
    if (!(image instanceof Image)) throw new Error('Please supply an image instance')
    this.image = image
    this.data = data
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

export default TileSet

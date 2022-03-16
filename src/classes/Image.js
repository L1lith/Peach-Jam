class Image {
  constructor(url = null) {
    if (url !== null) {
      if (typeof url == 'string') throw new Error('Image url must be a string or null')
      this.type = 'url'
      this.url = url
    }
  }
  static fromSpriteSheet(spriteSheetImage, x = 0, y = 0, width, height) {
    if (!(spriteSheetImage instanceof Image)) throw new Error('Expected a sprite sheet image')
    const image = new Image()
    image.type = 'sprite'
    image.spriteSheet = spriteSheetImage
    image.x = x
    image.y = y
    image.width = width
    image.height = height
    return image
  }
}

export default Image

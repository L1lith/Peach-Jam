class Image {
  constructor(url = null) {
    if (url !== null) {
      if (typeof url == 'string') throw new Error('Image url must be a string or null')
      this.type = 'url'
      this.url = url
    }
  }
  static fromRaw(urlData) {
    const image = new Image()
    image.type = 'raw'
    image.data = urlData
    return image
  }
  static fromSpriteSheet(url, x = 0, y = 0, width, height) {
    const image = new Image()
    image.type = 'sprite'
    image.spriteSheet = url
    image.x = x
    image.y = y
    image.width = width
    image.height = height
    return image
  }
}

export default Image

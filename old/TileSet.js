import Image from './Image'

class TileSet {
  constructor(
    image /*A single image file to extrapolate from */,
    data /*Tiled format JSON data */
  ) {
    if (typeof image == 'string') {
      image = new Image(image)
    }
    if (!(image instanceof Image)) throw new Error('Please supply an image instance')
    this.image = image
    this.data = data
    this.length = 0 //Override and calculate tile length here
  }
  nthImage(n) {
    throw new Error('Please override the TileSet constructor')
    // Override this and return an Image
  }
}

export default TileSet

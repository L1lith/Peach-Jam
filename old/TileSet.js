function TileSet(image, tileData) {
  if (typeof image != 'string') throw new Error('Please supply an image URL')
  if (typeof tileData != 'object' || tileData === null)
    throw new Error('Please supply the tile data')
}

export default TileSet

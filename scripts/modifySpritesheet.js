const fs = require('fs'),
  PNG = require('pngjs').PNG
const { join } = require('path')
let spriteSheet = './moonlightForest.png'
spriteSheet = join(__dirname, spriteSheet)

// Configured Values
const width = 16
const height = 16
const columns = 21
const rows = 16
const padding = 2
const outsidePadding = false
const overlapPadding = true

// Calculated values
const paddingFactor = overlapPadding ? 1 : 2
const newWidth = (width + padding * 2) * columns - (!outsidePadding ? padding * paddingFactor : 0)
const newHeight = (height + padding * 2) * rows - (!outsidePadding ? padding * paddingFactor : 0)

const dist = new PNG({
  width: newWidth,
  height: newHeight
})

fs.createReadStream(spriteSheet)
  .pipe(
    new PNG({
      //filterType: 4
    })
  )
  .on('parsed', function () {
    for (var y = 0; y < this.height; y++) {
      for (var x = 0; x < this.width; x++) {
        const i = (this.width * y + x) << 2
        const newX =
          Math.floor(x / width) * (padding * paddingFactor) + (outsidePadding ? padding : 0) + x
        const newY =
          Math.floor(y / height) * (padding * paddingFactor) + (outsidePadding ? padding : 0) + y
        const newI = (newWidth * newY + newX) << 2
        //if (i < 100) console.log({ x, y, newX, newY, i, newI })

        // invert color
        //if (this.data[i] !== 0) console.log(this.data[i])
        dist.data[newI] = this.data[i]
        dist.data[newI + 1] = this.data[i + 1]
        dist.data[newI + 2] = this.data[i + 2]

        // and reduce opacity
        dist.data[newI + 3] = this.data[i + 3]
      }
    }

    dist.pack().pipe(fs.createWriteStream('out.png'))
  })

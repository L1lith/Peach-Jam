import TiledMap from '../../../../../src/tiled/TiledMap'
import data from './theForest.json'
import moonlightForest from '../tilesets/moonlightForest'

const theForest = new TiledMap(data, [moonlightForest])

export default theForest

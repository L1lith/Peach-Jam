import TiledMap from '../../../../../dist/tiled/TiledMap'
import data from './theForest.json'
import moonForest from '../tilesets/moonForest'

const theForest = new TiledMap(data, [moonForest])

export default theForest

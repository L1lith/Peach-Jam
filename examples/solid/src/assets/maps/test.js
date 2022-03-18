import TiledMap from '../../../../../src/tiled/TiledMap'
import data from './test.json'
import dungeon from '../tilesets/dungeon'
import interiors from '../tilesets/interiors'

const testMap = new TiledMap(data, [dungeon, interiors])

export default testMap

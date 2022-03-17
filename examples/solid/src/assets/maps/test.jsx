import Map from '../../../../../src/components/Map'
import data from './test.json'
import dungeon from '../tilesets/dungeon'
import interiors from '../tilesets/interiors'

export default <Map data={data} tileSets={[dungeon, interiors]} />

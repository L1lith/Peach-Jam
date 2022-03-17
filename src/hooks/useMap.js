import useLayer from './useLayer'

function useMap({ data, tileSets }) {
  // Note: Data should follow the JSON format from the Tiled map editor
  if (isServer) {
    return null // TODO: Implement ISO map rendering
  } else {
    const map = {
      layers: data.layers.map(layerData => {
        const layer = useLayer()
      })
    }
  }
}

export default useMap

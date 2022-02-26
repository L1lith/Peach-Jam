import RenderEngine from '../RenderEngine'

const requiredMethods = ['render', 'mount', 'unmount']

export default {
  _: Object,
  validate: [
    renderEngine => renderEngine instanceof RenderEngine || 'Invalid RenderEngine supplied',
    renderEngine => {
      const missingMethod = requiredMethods.find(
        method => typeof renderEngine[method] !== 'function'
      )
      if (!missingMethod) return true
      return `RenderEngine instance Missing Method: ${missingMethod}`
    }
  ]
  //engine => typeof engine?.render == 'function' || 'Please supply a render function' // We don't need this anymore as the render function is passed to the constructor and validated there
}

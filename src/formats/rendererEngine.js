import RenderEngine from '../RenderEngine'

export default {
  _: Object,
  validate: renderEngine => renderEngine instanceof RenderEngine || 'Invalid RenderEngine supplied'
  //engine => typeof engine?.render == 'function' || 'Please supply a render function' // We don't need this anymore as the render function is passed to the constructor and validated there
}

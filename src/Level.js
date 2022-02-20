import { sanitize, ANY } from 'sandhands'
import { RenderEngineContext, default as RenderEngine } from './RenderEngine'
import getComponentAttributes from './functions/getComponentProps'

const propsFormat = {
  _: {
    renderer: {
      _: Object,
      validate: renderEngine =>
        renderEngine instanceof RenderEngine || 'Invalid RenderEngine supplied'
      //engine => typeof engine?.render == 'function' || 'Please supply a render function' // We don't need this anymore as the render function is passed to the constructor and validated there
    }
  },
  validate: props => props.hasOwnProperty('renderer') || 'Please provide a RenderEngine instance',
  strict: false
}

function Level(props) {
  sanitize(props, propsFormat)
  const attributes = getComponentAttributes(
    // Here we pass the attributes from the props
    props,
    Object.keys(
      propsFormat._ /* Don't pass any props meant for the Level, based on the propsFormat */
    )
  )
  return (
    <RenderEngineContext.Provider value={props.renderer}>
      <div {...attributes} className="level">
        {props.children || null}
      </div>
    </RenderEngineContext.Provider>
  )
}

export default Level

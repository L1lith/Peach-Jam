import { splitProps } from 'solid-js'
import useEntity from './functions/useEntity'

function Img(props) {
  const [local, attributes] = splitProps(props, ['style', 'x', 'y', 'width', 'height'])
  const style = () => {
    let output = {
      position: 'absolute',
      left: (props.hasOwnProperty('x') ? props.x : 0) + '%',
      top: (props.hasOwnProperty('y') ? props.y : 0) + '%',
      width: (props.hasOwnProperty('width') ? props.width : 100) + '%',
      height: (props.hasOwnProperty('height') ? props.height : 100) + '%'
    }
    if (local.hasOwnProperty('style')) output = { ...output, ...local.style }
    return output
  }
  const entityProps = { ...local, img: attributes.src }
  delete entityProps.style
  delete entityProps.href
  const entity = useEntity(entityProps)
  return <img style={style()} {...attributes}></img>
}

export default Img

import { splitProps, mergeProps } from 'solid-js'
import Entity from '../src/classes/Entity'
import { positionProps } from '../src/classes/Entity'

function Img(props) {
  const [local, attributes] = splitProps(props, ['style', ...positionProps])
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
  const entityProps = mergeProps(attributes, { img: attributes.src })
  const entity = useEntity(local, entityProps)
  return <img style={style()} {...attributes}></img>
}

export default Img

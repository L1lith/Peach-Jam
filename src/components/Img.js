import { splitProps, mergeProps } from 'solid-js'
import useEntity from '../hooks/useEntity'
import { positionProps } from '../classes/Entity'

function Img(props) {
  const [local, attributes] = splitProps(props, ['style', ...positionProps])
  const [position, entityPassProps] = splitProps(local, positionProps)
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
  const entityProps = mergeProps(entityPassProps, { img: attributes.src })
  const entity = useEntity(position, entityProps)
  return <img style={style()} {...attributes}></img>
}

export default Img

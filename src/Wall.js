import autoBind from 'auto-bind'
import { sanitize } from 'sandhands'
import { Component } from 'react'
import positionFormat from './formats/position'

const propsFormat = { ...positionFormat }

class Wall extends Component {
  constructor(props) {
    sanitize(props, propsFormat)
    this.props = props
    autoBind(this)
  }
  render() {
    // TODO: Show nothing except on first render. On first render we will display as vanilla HTML, making our game SSR compatible :)
    // We will attach to the game renderer using a react context
    return null
  }
}

export default Wall

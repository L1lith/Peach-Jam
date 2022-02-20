import { sanitize } from 'sandhands'

const excludeFormat = { _: [String], minLength: 0 }

function getComponentAttributes(props = {}, exclude = []) {
  sanitize(props, Object)
  sanitize(exclude, excludeFormat)
  const entries = Object.entries(props)
  const output = {}
  for (let i = 0, l = entries.length; i < l; i++) {
    const [name, value] = entries[i]
    if (name !== 'children' && !exclude.includes(name)) {
      output[name] = value
    }
  }
  return output
}

export default getComponentAttributes

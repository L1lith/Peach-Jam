function strictDiff(old, newObj) {
  const output = {}
  const keys = Object.keys(newObj)
  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i]
    if (!old.hasOwnProperty(key) || newObj[key] !== old[key]) {
      output[key] = newObj[key]
    }
  }
  return output
}

export default strictDiff

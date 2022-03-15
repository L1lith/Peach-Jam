import { onMount, onCleanup } from 'solid-js'
import { isServer } from 'solid-js/web'
// Reusable component that also takes dependencies
let last = null
let frame = null
const listeners = new Map()
const animate = () => {
  const now = performance.now()
  if (last === null) last = now
  const delta = now - last
  listeners.forEach((startTime, callback) => {
    const time = now - startTime
    callback({ time, delta })
  })
  last = now
  frame = requestAnimationFrame(animate)
}

function useAnimationFrame(callback) {
  if (isServer) {
    return
  } else {
    if (typeof callback != 'function') throw new Error('Callback is not a function')
    if (listeners.has(callback)) return
    onMount(() => {
      if (frame === null) frame = requestAnimationFrame(animate)
      listeners.set(callback, performance.now())
    }) // Make sure to change it if the deps change
    const cleanup = () => {
      const index = listeners.indexOf(callback)
      if (index >= 0) {
        listeners.splice(index, 1)
      }
      if (listeners.size < 1 && frame !== null) {
        cancelAnimationFrame(frame)
        frame = null
      }
    }
    onCleanup(cleanup)
    return cleanup
  }
}

export default useAnimationFrame

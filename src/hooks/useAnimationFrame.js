import { onMount, onCleanup } from 'solid-js'
import { isServer } from 'solid-js/web'
// Reusable component that also takes dependencies
let last = null
let frame = null
let globalStart = null
let totalFrames = 0
const listeners = new Map()
const animate = () => {
  const now = performance.now()
  if (last === null) last = now
  if (globalStart === null) globalStart = now
  totalFrames++
  if (window) window.fps = (totalFrames / (now - globalStart)) * 1000
  const delta = now - last
  listeners.forEach((startTime, callback) => {
    const time = now - startTime
    const global = now - globalStart
    callback({ time, delta, global })
  })
  last = now
  frame = requestAnimationFrame(animate)
}

function useAnimationFrame(callback) {
  if (isServer) {
    return null
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

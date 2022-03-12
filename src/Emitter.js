class Emitter {
  constructor() {
    this.listeners = {}
  }
  on(event, listener) {
    if (typeof listener != 'function') throw new Error('Listener must be a function')
    const listeners = this.getListeners(event)
    if (!listeners.includes(listener)) listeners.push(listener)
  }
  off(event, listener) {
    if (typeof listener != 'function') throw new Error('Listener must be a function')
    const listeners = this.getListeners(event)
    const index = listeners.indexOf(listener)
    if (index >= 0) {
      listener.splice(index, 1)
    }
  }
  getListeners(event) {
    if (typeof event != 'string') throw new Error('Event must be a String')
    if (this.listeners.hasOwnProperty(event)) {
      return this.listeners[event]
    } else {
      return (this.listeners[event] = [])
    }
  }
}

class Emitter {
  constructor(listeners = {}) {
    this.listeners = listeners
  }
  emit(event, ...args) {
    if (event === '*') throw new Error('Cannot emit a wildcard event')
    if (this.listeners.hasOwnProperty(event)) {
      this.listeners[event].forEach(listener => listener(...args))
    }
    if (this.listeners.hasOwnProperty('*')) {
      this.listeners['*'].forEach(listener => listener(event, ...args))
    }
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
    if (listeners.length < 1) {
      delete this.listeners[event]
    }
  }
  getListeners(event) {
    if (typeof event != 'string' || event.length < 1)
      throw new Error('Event must be a non-empty String')
    if (this.listeners.hasOwnProperty(event)) {
      return this.listeners[event]
    } else {
      return (this.listeners[event] = [])
    }
  }
}

export default Emitter

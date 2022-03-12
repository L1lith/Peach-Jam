class Emitter {
  constructor() {
    this.listeners = {}
  }
  on(event, listener) {
    const listeners = this.getListeners(event)
    if (!listeners.includes(listener)) listeners.push(listener)
  }
  off(event, listener) {
    const listeners = this.getListeners(event)
    const index = listeners.indexOf(listener)
    if (index >= 0) {
      listener.splice(index, 1)
    }
  }
  getListeners(event) {
    if (this.listeners.hasOwnProperty(event)) {
      return this.listeners[event]
    } else {
      return (this.listeners[event] = [])
    }
  }
}

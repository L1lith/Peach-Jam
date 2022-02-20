class PhysicsEngine {
  constructor(doPhysicsTick) {
    if (typeof doPhysicsTick != 'function') throw new Error('Expected a doPhysicsTick function')
    this.doPhysicsTick = doPhysicsTick
  }
}

export default PhysicsEngine

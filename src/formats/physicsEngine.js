import PhysicsEngine from '../PhysicsEngine'

const requiredMethods = ['doPhysicsTick', 'updateEntity']

export default {
  _: {
    doPhysicsTick: Function,
    updateEntity: Function
  },
  strict: false,
  validate: [
    physicsEngine => physicsEngine instanceof PhysicsEngine || 'Invalid PhysicsEngine supplied',
    physicsEngine => {
      const missingMethod = requiredMethods.find(
        method => typeof physicsEngine[method] !== 'function'
      )
      if (!missingMethod) return true
      return `PhysicsEngine instance Missing Method: ${missingMethod}`
    }
  ]
  //engine => typeof engine?.render == 'function' || 'Please supply a render function' // We don't need this anymore as the render function is passed to the constructor and validated there
}

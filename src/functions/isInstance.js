function isInstance(obj, classQuestion) {
  return (
    obj instanceof classQuestion ||
    obj?.constructor?.name === classQuestion.name ||
    (typeof classQuestion.type == 'string' &&
      obj?.type ===
        classQuestion.type) /* Support duck typing so that we don't get issues with type cloning */
  )
}

export default isInstance

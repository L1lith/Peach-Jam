function isInstance(obj, classQuestion) {
  return obj instanceof classQuestion || obj?.constructor?.name === classQuestion.name
}

export default isInstance

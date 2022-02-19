function Level(props) {
  const vanillaProps = { ...props }

  return <div className="level">{props.children || null}</div>
}

export default Level

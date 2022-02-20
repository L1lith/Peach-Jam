import { useState, useEffect } from 'react'

function useIsServer() {
  const [isServer, setIsServer] = useState(true)
  useEffect(() => {
    setIsServer(false)
  }, [])
  return isServer
}

export default useIsServer

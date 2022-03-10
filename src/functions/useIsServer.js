import { createEffect, createSignal } from 'solid-js'

function useIsServer() {
  const [isServer, setIsServer] = createSignal(true)
  createEffect(() => {
    setIsServer(false)
    console.log('setting not server', isServer())
  })
  return isServer
}

export default useIsServer

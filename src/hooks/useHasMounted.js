import { onMount, createSignal, onCleanup } from 'solid-js'

function useHasMounted() {
  const [hasMounted, setHasMounted] = createSignal(false)
  onMount(() => {
    setHasMounted(true)
  })
  onCleanup(() => {
    setHasMounted(false)
  })
  return hasMounted
}

export default useHasMounted

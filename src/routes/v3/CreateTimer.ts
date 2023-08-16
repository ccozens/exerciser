// svelte action to create a timer

export function createTimer(node, options) {
  const { delay } = options
  const timer = setTimeout(() => {
    node.dispatchEvent(new CustomEvent('timer'))
  }, delay)

  return {
    destroy() {
      clearTimeout(timer)
    }
  }
}
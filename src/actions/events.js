import { bubble, listen } from 'svelte/internal'

export default function eventsAction(node, component) {
  const events = Object.keys(component.$$.callbacks)
  const listeners = []
  events.forEach((event) =>
    listeners.push(listen(node, event, (e) => bubble(component, e)))
  )
  return {
    destroy() {
      listeners.forEach((listener) => listener())
    }
  }
}

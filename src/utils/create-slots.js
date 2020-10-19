import { detach, insert, noop } from 'svelte/internal'

export default function createSlots(slots) {
  const svelteSlots = {}

  for (const name in slots) {
    svelteSlots[name] = [createSlotFn(slots[name])]
  }

  return svelteSlots
}

function createSlotFn(nodes) {
  return () => {
    return {
      c: noop,
      m: function mount(target, anchor) {
        const frag = document.createDocumentFragment()
        nodes.forEach((node) => frag.appendChild(node))
        insert(target, frag, anchor)
      },
      d: function destroy(detaching) {
        if (detaching) {
          nodes.forEach((node) => detach(node))
        }
      },
      l: noop
    }
  }
}

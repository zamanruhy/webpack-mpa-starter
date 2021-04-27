import { dispatchEvent } from '@/utils'

export default function modal(node, id) {
  if (!id) {
    return
  }

  function onClick(e) {
    const { type, keyCode } = e
    if (
      type === 'click' ||
      (type === 'keydown' && (keyCode === 13 || keyCode === 32))
    ) {
      e.preventDefault()
      dispatchEvent(window, 'open:modal', { id })
    }
  }

  node.addEventListener('click', onClick)
  node.addEventListener('keydown', onClick)

  return {
    update(newId) {
      if (!newId) {
        return
      }
      id = newId
    },
    destroy() {
      node.removeEventListener('click', onClick)
      node.removeEventListener('keydown', onClick)
    }
  }
}

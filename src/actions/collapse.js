import { dispatchEvent } from '@/utils'

export default function collapse(node, options = {}) {
  if (typeof options !== 'object') {
    options = { id: String(options) }
  }

  if (!options.id) {
    return
  }

  let ids = options.id.split(' ')

  node.setAttribute('aria-controls', options.id)

  function onClick(e) {
    const { type, keyCode } = e
    if (
      type === 'click' ||
      (type === 'keydown' && (keyCode === 13 || keyCode === 32))
    ) {
      e.preventDefault()
      ids.forEach((id) => {
        dispatchEvent(window, 'toggleCollapse', { id })
      })
    }
  }

  function onUpdate({ detail }) {
    if (ids.includes(detail.id)) {
      if (detail.visible) {
        node.classList.remove(options.class || 'collapsed')
        node.setAttribute('aria-expanded', 'true')
      } else {
        node.classList.add(options.class || 'collapsed')
        node.setAttribute('aria-expanded', 'false')
      }
    }
  }

  node.addEventListener('click', onClick)
  node.addEventListener('keydown', onClick)
  window.addEventListener('collapseUpdate', onUpdate)

  return {
    update(newOptions) {
      if (typeof newOptions !== 'object') {
        newOptions = { id: String(newOptions) }
      }
      if (!newOptions.id) {
        return
      }
      options = newOptions
      ids = options.id.split(' ')
      node.setAttribute('aria-controls', options.id)
    },
    destroy() {
      node.removeEventListener('click', onClick)
      node.removeEventListener('keydown', onClick)
      window.removeEventListener('collapseUpdate', onUpdate)
    }
  }
}

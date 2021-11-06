export default function collapseAction(node, options = {}) {
  if (typeof options !== 'object') {
    options = { id: options }
  }

  let isCollapsed
  let ids = options.id.split(' ')

  node.setAttribute('aria-controls', options.id)

  if (node.tagName !== 'BUTTON') {
    if (!node.hasAttribute('role')) {
      node.setAttribute('role', 'button')
    }
    if (node.tagName !== 'A' && !node.hasAttribute('tabindex')) {
      node.setAttribute('tabindex', '0')
    }
  }

  function onClick(e) {
    if (
      e.type === 'click' ||
      (e.type === 'keydown' && ['Enter', ' '].includes(e.key))
    ) {
      e.preventDefault()
      ids.forEach((id) => {
        window.dispatchEvent(
          new CustomEvent('toggle-collapse', { detail: { id } })
        )
      })
    }
  }

  function onUpdate({ detail }) {
    if (ids.includes(detail.id)) {
      isCollapsed = !detail.open
      if (detail.open) {
        options.class && node.classList.remove(options.class)
        node.setAttribute('aria-expanded', 'true')
      } else {
        options.class && node.classList.add(options.class)
        node.setAttribute('aria-expanded', 'false')
      }
    }
  }

  node.addEventListener('click', onClick)

  if (!['BUTTON', 'A'].includes(node.tagName)) {
    node.addEventListener('keydown', onClick)
  }

  window.addEventListener('collapse-update', onUpdate)

  return {
    update(newOptions) {
      if (typeof newOptions !== 'object') {
        newOptions = { id: newOptions }
      }
      if (isCollapsed) {
        options.class && node.classList.remove(options.class)
        newOptions.class && node.classList.add(newOptions.class)
      }
      ids = newOptions.id.split(' ')
      node.setAttribute('aria-controls', newOptions.id)
      options = newOptions
    },
    destroy() {
      node.removeEventListener('click', onClick)

      if (!['BUTTON', 'A'].includes(node.tagName)) {
        node.removeEventListener('keydown', onClick)
      }

      window.removeEventListener('collapse-update', onUpdate)
    }
  }
}

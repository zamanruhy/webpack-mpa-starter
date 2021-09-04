export default function modal(node, id) {
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
      window.dispatchEvent(new CustomEvent('open-modal', { detail: { id } }))
    }
  }

  node.addEventListener('click', onClick)

  if (!['BUTTON', 'A'].includes(node.tagName)) {
    node.addEventListener('keydown', onClick)
  }

  return {
    update(newId) {
      id = newId
    },
    destroy() {
      node.removeEventListener('click', onClick)

      if (!['BUTTON', 'A'].includes(node.tagName)) {
        node.removeEventListener('keydown', onClick)
      }
    }
  }
}

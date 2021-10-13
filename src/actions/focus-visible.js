export default function focusVisibleAction(node, callback) {
  function onFocusVisible(e) {
    e.preventDefault()
    callback(e.detail)
  }

  node.addEventListener('focus-visible', onFocusVisible)

  return {
    update(newCallback) {
      callback = newCallback
    },
    destroy() {
      node.removeEventListener('focus-visible', onFocusVisible)
    }
  }
}

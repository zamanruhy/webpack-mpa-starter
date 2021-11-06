export default function portalAction(node, parentEl = document.body) {
  let commentEl = null
  function update(el) {
    if (el && el instanceof HTMLElement) {
      if (!commentEl) {
        commentEl = document.createComment('portal')
        node.after(commentEl)
      }
      el.appendChild(node)
    } else {
      if (commentEl) {
        commentEl.replaceWith(node)
        commentEl = null
      }
    }
  }
  update(parentEl)

  return {
    update,
    destroy() {
      if (commentEl) {
        node.remove()
        commentEl.remove()
        commentEl = null
      }
    }
  }
}

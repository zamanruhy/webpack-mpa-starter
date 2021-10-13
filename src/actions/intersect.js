export default function intersectAction(node, options) {
  let observer

  function update(_options = {}) {
    const {
      once = false,
      root = null,
      rootMargin = '0px',
      threshold = 0
    } = _options

    if (observer) {
      observer.disconnect()
    }

    observer = new IntersectionObserver(
      ([entry]) => {
        const intersecting = entry.isIntersecting
        if (intersecting && once) {
          observer.disconnect()
        }
        node.dispatchEvent(
          new CustomEvent('intersect', {
            detail: { intersecting, entry, observer }
          })
        )
      },
      {
        root,
        rootMargin,
        threshold
      }
    )

    observer.observe(node)
  }

  update(options)

  return {
    update,
    destroy() {
      observer.disconnect()
    }
  }
}

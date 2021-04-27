import { dispatchEvent } from '@/utils'

export default function intersect(node, options) {
  let observer

  function update(_options = {}) {
    const {
      once = false,
      root = null,
      rootMargin = '40px',
      threshold = 0
    } = _options

    if (observer) {
      observer.disconnect()
    }

    observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        const intersecting = entry.isIntersecting
        if (intersecting && once) {
          observer.disconnect()
        }
        dispatchEvent(node, 'intersect', { intersecting, entry, observer })
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

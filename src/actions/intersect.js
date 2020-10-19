import { dispatchEvent } from '@/utils'

// const supportObserver =
//   typeof window !== 'undefined' && 'IntersectionObserver' in window
// const supportScroll =
//   typeof window !== 'undefined' &&
//   'onscroll' in window &&
//   !/(gle|ing)bot/.test(navigator.userAgent)

intersect.support =
  typeof window !== 'undefined' &&
  'IntersectionObserver' in window &&
  'onscroll' in window &&
  !/(gle|ing)bot/.test(navigator.userAgent)

export default function intersect(node, options = {}) {
  const {
    once = false,
    root = null,
    rootMargin = '40px',
    threshold = 0
  } = options

  if (intersect.support) {
    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries[0].isIntersecting
        if (intersecting && once) {
          observer.unobserve(node)
        }
        dispatchEvent(node, 'intersect', { intersecting })
      },
      {
        root,
        rootMargin,
        threshold
      }
    )

    observer.observe(node)

    return {
      destroy() {
        observer.unobserve(node)
      }
    }
  } else {
    dispatchEvent(node, 'intersect', { intersecting: true })
  }
}

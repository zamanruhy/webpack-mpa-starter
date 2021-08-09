const popups = new Set()
let offsetElements = null
let scrollbarWidth = null
const appEl = document.querySelector('.app')

export function registerPopup(popup) {
  if (popups.has(popup)) {
    return
  }
  popups.add(popup)
  if (popups.size === 1) {
    setScrollbar()
    document.body.style.overflow = 'hidden'
    appEl.setAttribute('aria-hidden', 'true')
  }
}

export function unregisterPopup(popup) {
  if (!popups.has(popup)) {
    return
  }
  popups.delete(popup)
  if (popups.size === 0) {
    resetScrollbar()
    document.body.style.overflow = ''
    appEl.removeAttribute('aria-hidden')
  }
}

function checkBodyOverflow() {
  return window.innerWidth > document.documentElement.clientWidth
}

function setScrollbar() {
  if (!checkBodyOverflow()) {
    return
  }
  offsetElements = [
    document.body,
    ...Array.from(document.querySelectorAll('[data-fixed]'))
  ]
  offsetElements.forEach((el) => {
    const offset = el.getAttribute('data-fixed') || 'padding'
    const actual = el.style[`${offset}Right`]
    const computed = getComputedStyle(el)[`${offset}Right`]
    el.setAttribute(`data-${offset}-right`, actual)
    el.style[`${offset}Right`] = `${
      parseFloat(computed) + getScrollbarWidth()
    }px`
  })
}

function resetScrollbar() {
  if (offsetElements === null) {
    return
  }
  offsetElements.forEach((el) => {
    const offset = el.getAttribute('data-fixed') || 'padding'
    el.style[`${offset}Right`] = el.getAttribute(`data-${offset}-right`)
    el.removeAttribute(`data-${offset}-right`)
  })
  offsetElements = null
}

export function getScrollbarWidth() {
  if (scrollbarWidth === null) {
    const div = document.createElement('div')
    div.style.cssText = `
      width: 100px;
      height: 100px;
      position: absolute;
      overflow: scroll;
      top: -9999px`
    document.body.appendChild(div)
    scrollbarWidth = div.getBoundingClientRect().width - div.clientWidth
    document.body.removeChild(div)
  }
  return scrollbarWidth
}

function getFocusable(node) {
  // https://www.smashingmagazine.com/2021/07/accessible-dialog-from-scratch/
  const selector = [
    'a[href]',
    'area[href]',
    'input:not([type="hidden"]):not([type="radio"]):not([disabled])',
    'input[type="radio"]:not([disabled]):checked',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'button:not([disabled])',
    'iframe',
    'audio[controls]',
    'video[controls]',
    '[contenteditable]',
    '[tabindex]'
  ]
    .map((s) => `${s}:not([tabindex^="-"])`)
    .join(', ')

  return Array.from(node.querySelectorAll(selector)).filter(
    (el) => el.offsetWidth || el.offsetHeight || el.getClientRects().length
  )
}

export function trapFocus(e) {
  if (e.key !== 'Tab') {
    return
  }

  const focusable = getFocusable(e.currentTarget)

  if (focusable.length === 0) {
    e.preventDefault()
    return
  }

  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  const active = document.activeElement

  if (e.shiftKey) {
    if (active === first || active === e.currentTarget) {
      last.focus()
      e.preventDefault()
    }
  } else {
    if (active === last) {
      first.focus()
      e.preventDefault()
    }
  }
}

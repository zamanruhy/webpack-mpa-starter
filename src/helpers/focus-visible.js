// based on https://github.com/WICG/focus-visible/blob/v4.1.5/src/focus-visible.js

function init() {
  let hadKeyboardEvent = true
  let hadFocusVisibleRecently = false
  let hadFocusVisibleRecentlyTimeout = null

  const inputTypesWhitelist = {
    text: true,
    search: true,
    url: true,
    tel: true,
    email: true,
    password: true,
    number: true,
    date: true,
    month: true,
    week: true,
    time: true,
    datetime: true,
    'datetime-local': true
  }

  function isValidFocusTarget(el) {
    if (
      el &&
      el !== document &&
      el.nodeName !== 'HTML' &&
      el.nodeName !== 'BODY' &&
      'classList' in el &&
      'contains' in el.classList
    ) {
      return true
    }
    return false
  }

  function focusTriggersKeyboardModality(el) {
    const { type, tagName } = el

    if (tagName === 'INPUT' && inputTypesWhitelist[type] && !el.readOnly) {
      return true
    }

    if (tagName === 'TEXTAREA' && !el.readOnly) {
      return true
    }

    if (el.isContentEditable) {
      return true
    }

    return false
  }

  function addFocusVisible(el) {
    if (el.__focusVisible__) {
      return
    }
    el.__focusVisible__ = true

    if (
      el.dispatchEvent(
        new CustomEvent('focus-visible', { cancelable: true, detail: true })
      )
    ) {
      el.setAttribute('data-focus-visible', '')
    }
  }

  function removeFocusVisible(el) {
    if (!el.__focusVisible__) {
      return
    }
    delete el.__focusVisible__

    if (
      el.dispatchEvent(
        new CustomEvent('focus-visible', { cancelable: true, detail: false })
      )
    ) {
      el.removeAttribute('data-focus-visible')
    }
  }

  function onKeyDown(e) {
    if (e.metaKey || e.altKey || e.ctrlKey) {
      return
    }

    if (isValidFocusTarget(document.activeElement)) {
      addFocusVisible(document.activeElement)
    }

    hadKeyboardEvent = true
  }

  function onPointerDown(e) {
    hadKeyboardEvent = false
  }

  function onFocus(e) {
    if (!isValidFocusTarget(e.target)) {
      return
    }

    if (hadKeyboardEvent || focusTriggersKeyboardModality(e.target)) {
      addFocusVisible(e.target)
    }
  }

  function onBlur(e) {
    if (!isValidFocusTarget(e.target)) {
      return
    }

    if (e.target.__focusVisible__) {
      hadFocusVisibleRecently = true
      window.clearTimeout(hadFocusVisibleRecentlyTimeout)
      hadFocusVisibleRecentlyTimeout = window.setTimeout(() => {
        hadFocusVisibleRecently = false
        window.clearTimeout(hadFocusVisibleRecentlyTimeout)
      }, 100)
      removeFocusVisible(e.target)
    }
  }

  function onVisibilityChange(e) {
    if (document.visibilityState === 'hidden') {
      if (hadFocusVisibleRecently) {
        hadKeyboardEvent = true
      }
      addInitialPointerMoveListeners()
    }
  }

  function addInitialPointerMoveListeners() {
    document.addEventListener('pointermove', onInitialPointerMove)
    document.addEventListener('pointerdown', onInitialPointerMove)
    document.addEventListener('pointerup', onInitialPointerMove)
  }

  function removeInitialPointerMoveListeners() {
    document.removeEventListener('pointermove', onInitialPointerMove)
    document.removeEventListener('pointerdown', onInitialPointerMove)
    document.removeEventListener('pointerup', onInitialPointerMove)
  }

  function onInitialPointerMove(e) {
    hadKeyboardEvent = false
    removeInitialPointerMoveListeners()
  }

  document.addEventListener('keydown', onKeyDown, true)
  document.addEventListener('pointerdown', onPointerDown, true)
  document.addEventListener('focus', onFocus, true)
  document.addEventListener('blur', onBlur, true)
  document.addEventListener('visibilitychange', onVisibilityChange, true)
  addInitialPointerMoveListeners()
}

if (typeof document !== 'undefined') {
  init()
}

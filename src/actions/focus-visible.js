// based on https://github.com/WICG/focus-visible/blob/v4.1.5/src/focus-visible.js

let hadKeyboardEvent = true
let hadFocusVisibleRecently = false
let hadFocusVisibleRecentlyTimeout = null

function onKeyDown(e) {
  if (e.metaKey || e.altKey || e.ctrlKey) {
    return
  }
  hadKeyboardEvent = true
}

function onPointerDown(e) {
  hadKeyboardEvent = false
}

function onBlurInterop() {
  hadFocusVisibleRecently = true
  clearTimeout(hadFocusVisibleRecentlyTimeout)
  hadFocusVisibleRecentlyTimeout = setTimeout(() => {
    hadFocusVisibleRecently = false
    clearTimeout(hadFocusVisibleRecentlyTimeout)
  }, 100)
}

function onVisibilityChange() {
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

function onInitialPointerMove() {
  hadKeyboardEvent = false
  removeInitialPointerMoveListeners()
}

function init() {
  hadKeyboardEvent = true
  document.addEventListener('keydown', onKeyDown, true)
  document.addEventListener('pointerdown', onPointerDown, true)
  document.addEventListener('visibilitychange', onVisibilityChange, true)
  addInitialPointerMoveListeners()
}

function destroy() {
  document.removeEventListener('keydown', onKeyDown, true)
  document.removeEventListener('pointerdown', onPointerDown, true)
  document.removeEventListener('visibilitychange', onVisibilityChange, true)
  removeInitialPointerMoveListeners()
}

let count = 0

export default function focusVisibleAction(node, callback) {
  if (++count === 1) {
    init()
  }

  let focusVisible = false

  function onBlur() {
    if (focusVisible) {
      onBlurInterop()
      callback((focusVisible = false))
    }
  }

  function onFocus() {
    if (hadKeyboardEvent) {
      callback((focusVisible = true))
    }
  }

  function onKeyDown(e) {
    if (e.metaKey || e.altKey || e.ctrlKey) {
      return
    }
    callback((focusVisible = true))
  }

  node.addEventListener('focus', onFocus)
  node.addEventListener('blur', onBlur)
  node.addEventListener('keydown', onKeyDown)

  return {
    update(newCallback) {
      callback = newCallback
    },
    destroy() {
      if (--count === 0) {
        destroy()
      }

      node.removeEventListener('focus', onFocus)
      node.removeEventListener('blur', onBlur)
      node.removeEventListener('keydown', onKeyDown)
    }
  }
}

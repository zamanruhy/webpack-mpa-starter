export * as easing from './easing'
export { default as customElement } from './custom-element'
export { default as createSlots } from './create-slots'

export function camelize(str) {
  return str.replace(/-(\w)/g, (_, c) => {
    return c ? c.toUpperCase() : ''
  })
}

export function hyphenate(str) {
  return str.replace(/\B([A-Z])/g, '-$1').toLowerCase()
}

export function uid() {
  return Math.random().toString(36).substr(2, 9)
}

export function dispatchEvent(node, name, detail = null) {
  node.dispatchEvent(
    new CustomEvent(name, {
      bubbles: false,
      cancelable: false,
      detail
    })
  )
}

export function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

export * from './easing'
export { default as customElement } from './custom-element'

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

export function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

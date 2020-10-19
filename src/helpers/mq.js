import { readable, derived } from 'svelte/store'

const breakpoints = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
}

export const mqs = Object.entries(breakpoints).reduce((acc, [bp, width]) => {
  acc[`${bp}Up`] = getReadable(`(min-width: ${width}px)`)
  acc[`${bp}Down`] = getReadable(`(max-width: ${width - 1}px)`)
  return acc
}, {})

export const mq = derived(Object.values(mqs), (values) =>
  values.reduce((acc, value, i) => {
    acc[Object.keys(mqs)[i]] = value
    return acc
  }, {})
)

function getReadable(query) {
  return readable(false, (set) => {
    const mql = window.matchMedia(query)
    const cb = (e) => set(e.matches)
    cb(mql)
    mql.addListener(cb)
    return () => mql.removeListener(cb)
  })
}

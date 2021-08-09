import { derived } from 'svelte/store'
import createMedia from './create-media'

const breakpoints = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
}

export const bps = Object.entries(breakpoints).reduce((acc, [key, val]) => {
  acc[`${key}Up`] = createMedia(`(min-width: ${val}px)`)
  acc[`${key}Down`] = createMedia(`(max-width: ${val - 1}px)`)
  return acc
}, {})

export const bp = derived(Object.values(bps), (values) =>
  values.reduce((acc, value, i) => {
    acc[Object.keys(bps)[i]] = value
    return acc
  }, {})
)

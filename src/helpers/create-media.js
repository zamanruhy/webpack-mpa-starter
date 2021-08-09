import { readable } from 'svelte/store'

export default function createMedia(str) {
  return readable(false, (set) => {
    const mql = window.matchMedia(str)
    set(mql.matches)
    mql.onchange = () => set(mql.matches)
    return () => (mql.onchange = null)
  })
}

import { tick } from 'svelte'

export { createSlots } from '@/utils'

export function waitRAF() {
  return new Promise((resolve) => {
    requestAnimationFrame(resolve)
  })
}

export function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function waitTransition(ms) {
  await tick()
  await waitRAF()
  await wait(ms)
  await waitRAF()
  await tick()
}

import { get } from 'svelte/store'
import { slideIndex } from '@/store'

export default function styleguide() {
  const el = document.querySelector('.styleguide')

  if (!el) {
    return
  }

  const swiperEl = el.querySelector('.styleguide__modal-swiper')

  swiperEl.index = get(slideIndex)
  swiperEl.options = {
    pagination: true,
    navigation: true,
    keyboard: true
  }

  swiperEl.addEventListener('mount', () => {
    swiperEl.component.$on('update', (e) => {
      slideIndex.set(e.detail)
    })
  })

  slideIndex.subscribe((index) => {
    swiperEl.index = index
  })
}

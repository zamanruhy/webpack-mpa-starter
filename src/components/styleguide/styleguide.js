// import { get } from 'svelte/store'
// import { slideIndex } from '@/store'
import { render } from 'solid-js/web'
import Solid from './Solid.jsx'
import Spinner from '../solid/Spinner.jsx'
// import App from './App.jsx'
import ce from '../../utils/ce'

ce('solid-spinner', Spinner)

export default function styleguide() {
  const el = document.querySelector('.styleguide')

  if (!el) {
    return
  }

  render(() => <Solid />, document.getElementById('mount'))

  // const swiperEl = el.querySelector('.styleguide__modal-swiper')

  // swiperEl.index = get(slideIndex)
  // swiperEl.options = {
  //   pagination: true,
  //   navigation: true,
  //   keyboard: true
  // }

  // swiperEl.addEventListener('mount', () => {
  //   swiperEl.component.$on('update', (e) => {
  //     const [swiper] = e.detail
  //     slideIndex.set(swiper.realIndex)
  //   })
  // })

  // slideIndex.subscribe((index) => {
  //   swiperEl.index = index
  // })

  // const tabSwiperEl = document.querySelector('.styleguide__tab-swiper')

  // tabSwiperEl.options = {
  //   navigation: true
  // }
}

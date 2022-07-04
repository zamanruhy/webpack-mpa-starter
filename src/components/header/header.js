// import { bps } from '@/helpers/bp'
// import { slideIndex } from '@/store'

export default function header() {
  const el = document.querySelector('.header')

  if (!el) {
    return
  }

  const toggleEl = el.querySelector('.header__toggle')
  const drawerEl = el.querySelector('.header__drawer')

  toggleEl.addEventListener('click', () => {
    drawerEl.open = toggleEl.active
  })

  drawerEl.addEventListener('mount', () => {
    drawerEl.component.$on('close', () => {
      toggleEl.active = false
    })
  })

  // bps.mdUp.subscribe((value) => {
  //   // console.log(value)
  // })

  // const swiperEl = document.querySelector('.styleguide__main-swiper')
  // const prevEl = document.querySelector('.styleguide__prev')
  // const nextEl = document.querySelector('.styleguide__next')

  // if (!swiperEl) {
  //   return
  // }

  // customElements.whenDefined('app-button').then(() => {
  //   console.log(prevEl.el.outerHTML, nextEl.el.outerHTML)
  // })

  // swiperEl.id = 'some-id'

  // function onNavMount() {
  //   if (!prevEl.el || !nextEl.el) {
  //     return
  //   }
  //   swiperEl.options = {
  //     navigation: {
  //       prevEl: prevEl.el,
  //       nextEl: nextEl.el
  //     },
  //     pagination: {}
  //   }
  // }

  // prevEl.addEventListener('mount', onNavMount)
  // nextEl.addEventListener('mount', onNavMount)

  // swiperEl.addEventListener('mount', () => {
  //   swiperEl.component.$on('slideChange', (e) => {
  //     const [swiper] = e.detail
  //     slideIndex.set(swiper.realIndex)
  //   })
  // })

  // slideIndex.subscribe((index) => {
  //   swiperEl.index = index
  // })
}

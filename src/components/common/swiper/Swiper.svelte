<script>
  import Swiper, { Navigation, Pagination, A11y, Keyboard } from 'swiper'
  import {
    onMount,
    afterUpdate,
    onDestroy,
    tick,
    createEventDispatcher
  } from 'svelte'

  Swiper.use([Navigation, Pagination, A11y, Keyboard])

  let className = ''
  export { className as class }
  export let index = 0
  export let options = {}
  export let swiper = null

  let el
  let wrapperEl
  let nextEl
  let prevEl
  let paginationEl
  let scrollbarEl
  let ready = false
  const dispatch = createEventDispatcher()

  $: paginationComputed = options.pagination && !options.pagination.el
  $: scrollbarComputed = options.scrollbar && !options.scrollbar.el
  $: navigationComputed =
    options.navigation &&
    !options.navigation.nextEl &&
    !options.navigation.prevEl
  $: optionsComputed = {
    ...options,
    navigation: {
      nextEl: nextEl,
      prevEl: prevEl,
      ...options.navigation
    },
    pagination: {
      el: paginationEl,
      type: 'bullets',
      clickable: true,
      ...options.pagination
    },
    scrollbar: {
      el: scrollbarEl,
      ...options.scrollbar
    },
    a11y: {},
    onAny(event, ...args) {
      dispatch(event, args)
    }
  }
  $: if (swiper && swiper.realIndex !== index) {
    swiper.slideToLoop(index)
  }
  $: optionsComputed, ready && (destroySwiper(), initSwiper())

  function initSwiper() {
    if (swiper) {
      return
    }
    swiper = new Swiper(el, {
      ...optionsComputed,
      initialSlide: index
    })
    swiper.on('slideChange', () => {
      index = swiper.realIndex
    })
  }
  function destroySwiper() {
    if (swiper) {
      swiper.destroy()
      swiper = null
    }
  }
  function updateSwiper() {
    if (swiper) {
      if (optionsComputed.loop) {
        swiper.loopDestroy()
        swiper.loopCreate()
      }
      swiper.update()
    }
  }

  onMount(async () => {
    await tick()
    ready = true
  })

  onDestroy(() => {
    destroySwiper()
  })

  afterUpdate(() => {
    updateSwiper()
  })
</script>

<div class="swiper {className}" bind:this={el}>
  <slot name="before-wrapper" />

  <div class="swiper-wrapper" bind:this={wrapperEl}>
    <slot />
  </div>

  {#if paginationComputed}
    <div class="swiper-pagination" bind:this={paginationEl} />
  {/if}

  {#if scrollbarComputed}
    <div class="swiper-scrollbar" bind:this={scrollbarEl} />
  {/if}

  {#if navigationComputed}
    <div class="swiper-button-prev" bind:this={prevEl} />
    <div class="swiper-button-next" bind:this={nextEl} />
  {/if}

  <slot name="after-wrapper" />
</div>

<style lang="postcss" global>
  @import 'swiper/swiper.min.css';
  @import 'swiper/modules/navigation/navigation.min.css';
  @import 'swiper/modules/pagination/pagination.min.css';
  @import 'swiper/modules/a11y/a11y.min.css';
  @import 'swiper/modules/keyboard/keyboard.min.css';

  :root {
    --swiper-theme-color: var(--color-primary);
  }
</style>

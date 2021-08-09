<script>
  import {
    Swiper,
    Navigation,
    Pagination,
    Scrollbar,
    A11y,
    Keyboard
  } from 'swiper'
  import {
    onMount,
    afterUpdate,
    onDestroy,
    tick,
    createEventDispatcher
  } from 'svelte'
  import events from './events'

  Swiper.use([Navigation, Pagination, Scrollbar, A11y, Keyboard])

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
    }
  }
  $: dispatch('update', index)
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
    bindSwiperEvents()
  }
  function bindSwiperEvents() {
    events.forEach((event) => {
      swiper.on(event, (...args) => {
        dispatch(event, args)
      })
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

<div class="swiper-container" bind:this={el}>
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

<style lang="scss" global>
  @use 'swiper/swiper.min.css';
  @use 'swiper/components/navigation/navigation.min.css';
  @use 'swiper/components/pagination/pagination.min.css';
  @use 'swiper/components/scrollbar/scrollbar.min.css';
  @use 'swiper/components/a11y/a11y.min.css';

  :root {
    --swiper-theme-color: #{$color-primary};
  }

  app-swiper:defined {
    display: contents;
  }

  app-swiper-slide:defined {
    display: none;
  }

  app-swiper:not(:defined) {
    display: flex;
    overflow: hidden;
    margin: 0 auto;

    > [slot] {
      display: none;
    }
  }

  app-swiper-slide:not(:defined) {
    display: block;
    flex: none;
    width: 100%;
  }
</style>

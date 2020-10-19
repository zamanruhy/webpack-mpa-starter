<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte'
  import {
    getScrollbarWidth,
    registerPopup,
    unregisterPopup,
    trapFocus
  } from '@/helpers/popup'
  import { portal } from '@/actions'
  import { easing } from '@/utils'
  import Backdrop from './Backdrop.svelte'

  export let visible = false

  let el
  let returnElement = null
  let mounted = false
  const drawer = {}
  const dispatch = createEventDispatcher()

  $: dispatch('update', visible)
  $: visible && mounted && beforeOpen()

  function open() {
    visible = true
  }
  function close() {
    visible = false
  }
  function beforeOpen() {
    returnElement = document.activeElement
    registerPopup(drawer)
  }
  function onOpen() {
    dispatch('open')
    setFocus()
  }
  function onOpened() {
    dispatch('opened')
  }
  function onClose() {
    dispatch('close')
    el.classList.remove('drawer_visible')
  }
  function onClosed() {
    returnElement && returnElement.focus({ preventScroll: true })
    dispatch('closed')
    unregisterPopup(drawer)
  }
  function slide() {
    return {
      duration: 200,
      easing: easing.fastOutSlowIn,
      css: (t, n) => {
        return `transform: translateX(${n * 100}%);`
      }
    }
  }
  function onEsc(e) {
    if (e.keyCode === 27) {
      close()
    }
  }
  function setFocus() {
    const active = document.activeElement
    if (!el.contains(active)) {
      el.focus()
    }
  }

  onMount(() => {
    mounted = true
    getScrollbarWidth()
  })

  onDestroy(() => {
    unregisterPopup(drawer)
  })
</script>

<svelte:window on:openDrawer={open} on:closeDrawer={close} />

{#if visible && mounted}
  <div class="drawer-container" use:portal>
    <div
      class="drawer"
      class:drawer_visible={visible}
      tabindex="-1"
      bind:this={el}
      transition:slide
      on:keydown={onEsc}
      on:keydown={trapFocus}
      on:introstart={onOpen}
      on:introend={onOpened}
      on:outrostart={onClose}
      on:outroend={onClosed}
    >
      <div class="drawer__inner">
        <button
          class="drawer__close"
          type="button"
          aria-label="Close drawer"
          on:click={close}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 371.23 371.23">
            <path
              d="M371.23 21.213L350.018 0 185.615 164.402 21.213 0 0
              21.213l164.402 164.402L0 350.018l21.213 21.212
              164.402-164.402L350.018 371.23l21.212-21.212-164.402-164.403z"
            />
          </svg>
        </button>
        <slot />
      </div>
    </div>
    <Backdrop {visible} on:click={close} />
  </div>
{/if}

<style lang="scss" global>
  .drawer {
    background-color: #ffffff;
    position: fixed;
    top: 0;
    right: 0;
    overflow-y: auto;
    width: 340px;
    max-width: 100%;
    height: 100%;
    outline: 0 !important;
    z-index: map-get($z-indexes, fixed);
    will-change: transform;

    &_visible {
      box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.2),
        0px 16px 24px 2px rgba(0, 0, 0, 0.14),
        0px 6px 30px 5px rgba(0, 0, 0, 0.12);
    }

    &__inner {
      min-height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0 auto;
      position: relative;
      padding: 30px;
    }

    &__close {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 20px;
      right: 20px;
      z-index: 100;
      cursor: pointer;
      border: none;
      background-color: transparent;
      color: #333333;
      font-size: 20px;
      padding: 0;

      svg {
        height: 1em;
        vertical-align: middle;
        fill: currentColor;
      }
    }

    & ~ .backdrop {
      z-index: map-get($z-indexes, fixed) - 1;
    }
  }

  app-drawer:not(:defined) {
    display: none;
  }
</style>

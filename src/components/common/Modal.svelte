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

  export let id = ''
  export let visible = false
  export let noCloseOnBackdrop = false
  export let noCloseOnEsc = false
  export let variant = ''

  let modalEl
  let contentEl
  let isModalOverflowing = false
  let returnElement = null
  let observer = null
  let mounted = false
  const modal = {}
  const dispatch = createEventDispatcher()

  $: modalClasses = ['modal', variant && `modal_${variant}`]
    .filter((c) => c)
    .join(' ')
  $: modalStyles = `padding-left: ${
    isModalOverflowing ? `${getScrollbarWidth()}px` : '0'
  }`
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
    registerPopup(modal)
  }
  function onOpen() {
    dispatch('open')
    observeDom()
    checkModalOverflow()
    setFocus()
  }
  function onOpened() {
    dispatch('opened')
  }
  function onClose() {
    dispatch('close')
    unobserveDom()
  }
  function onClosed() {
    returnElement && returnElement.focus({ preventScroll: true })
    dispatch('closed')
    unregisterPopup(modal)
  }
  function scale() {
    return {
      duration: 300,
      easing: easing.fastInFastOut,
      css: (t, n) => {
        return `
          transform: scale(${0.9 + 0.1 * t}, ${0.85 + 0.15 * t});
          opacity: ${t};`
      }
    }
  }
  function onClickOut(e) {
    if (!noCloseOnBackdrop && !contentEl.contains(e.target)) {
      close()
    }
  }
  function onEsc(e) {
    if (!noCloseOnEsc && e.keyCode === 27) {
      close()
    }
  }
  function setFocus() {
    const active = document.activeElement
    if (!contentEl.contains(active)) {
      contentEl.focus()
      modalEl.scrollTop = 0
    }
  }
  function checkModalOverflow() {
    if (visible) {
      isModalOverflowing =
        modalEl.scrollHeight > document.documentElement.clientHeight
    }
  }
  function observeDom() {
    if (!('MutationObserver' in window)) {
      return
    }
    observer = new MutationObserver((mutations) => {
      let changed = false
      for (let i = 0; i < mutations.length && !changed; i++) {
        const mutation = mutations[i]
        const type = mutation.type
        const target = mutation.target

        if (type === 'characterData' && target.nodeType === Node.TEXT_NODE) {
          changed = true
        } else if (type === 'attributes') {
          changed = true
        } else if (
          type === 'childList' &&
          (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)
        ) {
          changed = true
        }
      }
      if (changed) {
        checkModalOverflow()
      }
    }).observe(contentEl, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    })
  }
  function unobserveDom() {
    if (observer) {
      observer.disconnect()
      observer = null
    }
  }
  function openHandler({ detail }) {
    if (id === detail.id) {
      open()
    }
  }
  function closeHandler({ detail }) {
    if (id === detail.id) {
      close()
    }
  }

  onMount(() => {
    mounted = true
    getScrollbarWidth()
  })

  onDestroy(() => {
    unregisterPopup(modal)
  })
</script>

<svelte:window
  on:openModal={openHandler}
  on:closeModal={closeHandler}
  on:resize={checkModalOverflow}
  on:orientationchange={checkModalOverflow}
/>

{#if visible && mounted}
  <div class="modal-container" use:portal>
    <div
      {id}
      class={modalClasses}
      style={modalStyles}
      role="dialog"
      bind:this={modalEl}
      on:click={onClickOut}
      on:keydown={onEsc}
    >
      <div
        class="modal__dialog"
        transition:scale
        on:introstart={onOpen}
        on:introend={onOpened}
        on:outrostart={onClose}
        on:outroend={onClosed}
      >
        <div
          class="modal__content"
          tabindex="-1"
          role="document"
          bind:this={contentEl}
          on:keydown={trapFocus}
        >
          <button
            class="modal__close"
            type="button"
            aria-label="Close"
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
    </div>
    <Backdrop {visible} on:click={onClickOut} />
  </div>
{/if}

<style lang="scss" global>
  $modal-padding-y: 30px;

  .modal-container {
    position: absolute;
    z-index: map-get($z-indexes, modal);
  }

  .modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow-x: hidden;
    overflow-y: auto;
    z-index: map-get($z-indexes, modal);

    &__dialog {
      margin: $modal-padding-y auto;
      min-height: calc(100% - #{$modal-padding-y} * 2);
      width: 100%;
      display: flex;
      align-items: center;
      will-change: transform, opacity;
    }

    &__content {
      margin: auto;
      position: relative;
      background-color: #ffffff;
      box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2),
        0px 24px 38px 3px rgba(0, 0, 0, 0.14),
        0px 9px 46px 8px rgba(0, 0, 0, 0.12);
      border-radius: 4px;
      max-width: 100%;
      padding: 40px 40px 40px;
      outline: 0 !important;
      width: 720px;
    }

    &__close {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 16px;
      right: 16px;
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
  }

  app-modal:not(:defined) {
    display: none;
  }
</style>

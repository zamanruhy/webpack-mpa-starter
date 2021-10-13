<script>
  import { createEventDispatcher, onMount, onDestroy, tick } from 'svelte'
  import {
    getScrollbarWidth,
    registerPopup,
    unregisterPopup,
    trapFocus
  } from '@/helpers/popup'
  import { portalAction } from '@/actions'
  import { fastInFastOut } from '@/utils'
  import Backdrop from './Backdrop.svelte'

  let className = ''
  export { className as class }
  export let style = ''
  export let id = ''
  export let visible = false
  export let noCloseOnBackdrop = false
  export let noCloseOnEsc = false
  export let variant = ''
  export let inTransition = scale
  export let outTransition = scale
  export let closeAriaLabel = 'Close modal'

  let el
  let contentEl
  let isOverflowing = false
  let returnFocus = null
  let observer = null
  let mounted = false
  const modal = {}
  const dispatch = createEventDispatcher()

  $: classes = ['modal', variant && `modal_${variant}`, className]
    .filter(Boolean)
    .join(' ')
  $: styles = `
    ${style ? `${style};` : ''}
    ${isOverflowing ? `padding-left: ${getScrollbarWidth()}px;` : ''}
  `
  $: dispatch('update', visible)
  $: visible && mounted && beforeOpen()

  function open() {
    visible = true
  }
  function close() {
    visible = false
  }
  function beforeOpen() {
    returnFocus = returnFocus || document.activeElement
    registerPopup(modal)
  }
  function onOpen() {
    dispatch('open')
    observeSize()
    checkOverflow()
  }
  function onOpened() {
    dispatch('opened')
    setFocus()
  }
  function onClose() {
    dispatch('close')
    unobserveSize()
  }
  function onClosed() {
    dispatch('closed')
    tick().then(afterClose)
  }
  function afterClose() {
    returnFocus.focus?.()
    returnFocus = null
    unregisterPopup(modal)
  }
  function scale() {
    return {
      duration: 300,
      easing: fastInFastOut,
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
    if (!noCloseOnEsc && e.key === 'Escape') {
      close()
    }
  }
  function setFocus() {
    if (!el.contains(document.activeElement)) {
      el.focus()
    }
  }
  function checkOverflow() {
    isOverflowing = el.scrollHeight > document.documentElement.clientHeight
  }
  function observeSize() {
    if (!('ResizeObserver' in window)) {
      return
    }
    observer = new ResizeObserver(checkOverflow)
    observer.observe(contentEl)
  }
  function unobserveSize() {
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
    unobserveSize()
    unregisterPopup(modal)
  })
</script>

<svelte:window
  on:open-modal={id && openHandler}
  on:close-modal={id && closeHandler}
  on:resize={visible && checkOverflow}
/>

{#if visible && mounted}
  <div class="modal-container" use:portalAction>
    <div
      {id}
      class={classes}
      style={styles}
      {...$$restProps}
      role="dialog"
      aria-modal="true"
      tabindex="-1"
      bind:this={el}
      on:click={onClickOut}
      on:keydown={onEsc}
      on:keydown={trapFocus}
    >
      <div
        class="modal__dialog"
        in:inTransition|local
        out:outTransition|local
        on:introstart={onOpen}
        on:introend={onOpened}
        on:outrostart={onClose}
        on:outroend={onClosed}
      >
        <div class="modal__content" role="document" bind:this={contentEl}>
          <button
            class="modal__close"
            type="button"
            aria-label={closeAriaLabel}
            on:click={close}
          >
            <slot name="close-icon">
              <svg viewBox="0 0 371.23 371.23">
                <path
                  d="M371.23 21.213L350.018 0 185.615 164.402 21.213 0 0
                21.213l164.402 164.402L0 350.018l21.213 21.212
                164.402-164.402L350.018 371.23l21.212-21.212-164.402-164.403z"
                />
              </svg>
            </slot>
          </button>
          <slot {close} />
        </div>
      </div>
    </div>
    <Backdrop {visible} />
  </div>
{/if}

<style lang="postcss" global>
  .modal-container {
    position: relative;
    z-index: var(--z-index-modal);
  }

  .modal {
    --modal-margin: 28px;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow-x: hidden;
    overflow-y: auto;
    z-index: var(--z-index-modal);
    outline: 0;

    @mixin down sm {
      --modal-margin: 8px;
    }

    &__dialog {
      margin: var(--modal-margin);
      min-height: calc(100% - var(--modal-margin) * 2);
      display: flex;
      align-items: center;
      justify-content: center;
      will-change: transform, opacity;
    }

    &__content {
      position: relative;
      background-color: #ffffff;
      box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2),
        0px 24px 38px 3px rgba(0, 0, 0, 0.14),
        0px 9px 46px 8px rgba(0, 0, 0, 0.12);
      border-radius: 4px;
      width: 100%;
      max-width: 720px;
      min-width: 0;
      padding: 40px 40px 40px;
    }

    &__close {
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
        display: block;
        height: 1em;
        fill: currentColor;
      }
    }
  }
</style>

<script>
  import { createEventDispatcher, onMount, onDestroy, tick } from 'svelte'
  import { registerPopup, unregisterPopup, trapFocus } from '@/helpers/modal'
  import { portalAction } from '@/actions'
  import { cubicOut, cubicInOut } from 'svelte/easing'
  import Backdrop from './Backdrop.svelte'

  let className = ''
  export { className as class }
  export let id = ''
  export let open = false
  export let noCloseOnBackdrop = false
  export let noCloseOnEsc = false
  export let variant = ''
  export let inTransition = scale
  export let outTransition = scale
  export let scrollable = false
  export let closeButtonAriaLabel = 'Close'
  export let getParentEl = () => document.body

  let el
  let contentEl
  let returnFocusEl = null
  let mounted = false
  const modal = {}
  const dispatch = createEventDispatcher()

  $: classes = [
    'modal',
    variant && `modal_${variant}`,
    scrollable && 'modal_scrollable',
    open && 'modal_open',
    className
  ]
    .filter(Boolean)
    .join(' ')
  $: dispatch('update', open)
  $: open && mounted && beforeOpen()

  function close() {
    open = false
  }
  function beforeOpen() {
    returnFocusEl = returnFocusEl || document.activeElement
    registerPopup(modal)
  }
  function onIntrostart() {
    dispatch('open')
  }
  function onIntroend() {
    dispatch('opened')
    setFocus()
  }
  function onOutrostart() {
    dispatch('close')
    el.classList.remove('modal_open')
  }
  function onOutroend() {
    dispatch('closed')
    tick().then(afterClose)
  }
  function afterClose() {
    returnFocusEl.focus?.()
    returnFocusEl = null
    unregisterPopup(modal)
  }
  function scale(node, { duration, easing }) {
    return {
      duration,
      easing,
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
  function onToggleModal({ detail }) {
    if (id === detail.id) {
      open = !open
    }
  }

  onMount(() => {
    mounted = true
  })

  onDestroy(() => {
    unregisterPopup(modal)
  })
</script>

<svelte:window on:toggle-modal={id && onToggleModal} />

{#if open && mounted}
  <div class="modal-container" use:portalAction={getParentEl()}>
    <div
      {id}
      class={classes}
      role="dialog"
      aria-modal="true"
      {...$$restProps}
      tabindex="-1"
      bind:this={el}
      on:click={onClickOut}
      on:keydown={onEsc}
      on:keydown={trapFocus}
    >
      <div
        class="modal__content"
        in:inTransition|local={{ duration: 200, easing: cubicOut }}
        out:outTransition|local={{ duration: 150, easing: cubicInOut }}
        bind:this={contentEl}
        on:introstart={onIntrostart}
        on:introend={onIntroend}
        on:outrostart={onOutrostart}
        on:outroend={onOutroend}
      >
        <button
          class="modal__close"
          type="button"
          aria-label={closeButtonAriaLabel}
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
    <slot name="backdrop" {open}>
      <Backdrop />
    </slot>
  </div>
{/if}

<style lang="postcss" global>
  .modal-container {
    position: relative;
    z-index: var(--z-index-modal);
  }

  .modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow-x: hidden;
    overflow-y: overlay;
    z-index: var(--z-index-modal);
    outline: 0;
    display: flex;
    padding: 28px;

    @mixin down sm {
      padding: 8px;
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
      padding: 24px 28px 28px;

      margin: auto;
      will-change: transform, opacity;
      display: flex;
      flex-direction: column;
    }
    &_scrollable &__content {
      overflow-y: auto;
      overflow-x: hidden;
      max-height: 100%;
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
      border-radius: 1px;
      align-self: flex-end;

      &::before {
        content: '';
        width: max(30px, 100%);
        height: max(30px, 100%);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: inherit;
      }

      svg {
        display: block;
        height: 1em;
        fill: currentColor;
      }
    }
  }
</style>

<script>
  import { createEventDispatcher, onMount, onDestroy, tick } from 'svelte'
  import { registerModal, unregisterModal, trapFocus } from '@/helpers/modal'
  import { portalAction } from '@/actions'
  import { easeOut } from '@/utils'
  import Backdrop from './Backdrop.svelte'

  let className = ''
  export { className as class }
  export let id = undefined
  export let open = false
  export let closeOnBackdrop = true
  export let closeOnEscape = true
  export let variant = ''
  export let transition = scale
  export let inTransition = transition
  export let outTransition = transition
  export let scrollable = false
  export let closeButton = true // bool | object
  export let action = () => {}
  export let getParentEl = () => document.body

  let el
  let contentEl
  let returnFocusEl = null
  let mounted = false
  const dialog = {}
  const dispatch = createEventDispatcher()

  $: classes = [
    'dialog',
    variant && `dialog_${variant}`,
    scrollable && 'dialog_scrollable',
    open && 'dialog_open',
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
    registerModal(dialog)
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
    el.classList.remove('dialog_open')
  }
  function onOutroend() {
    dispatch('closed')
    tick().then(afterClose)
  }
  function afterClose() {
    returnFocusEl.focus?.()
    returnFocusEl = null
    unregisterModal(dialog)
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
    if (closeOnBackdrop && !contentEl.contains(e.target)) {
      close()
    }
  }
  function onEscape(e) {
    if (closeOnEscape && e.key === 'Escape') {
      close()
    }
  }
  function setFocus() {
    if (!el.contains(document.activeElement)) {
      el.focus()
    }
  }

  onMount(() => {
    mounted = true
  })

  onDestroy(() => {
    unregisterModal(dialog)
  })
</script>

{#if open && mounted}
  <div class="dialog-container" use:portalAction={getParentEl()}>
    <div
      {id}
      class={classes}
      role="dialog"
      aria-modal="true"
      {...$$restProps}
      tabindex="-1"
      bind:this={el}
      on:click={onClickOut}
      on:keydown={onEscape}
      on:keydown={trapFocus}
    >
      <div
        class="dialog__container"
        in:inTransition={{ duration: 200, easing: easeOut }}
        out:outTransition={{ duration: 150, easing: easeOut }}
        on:introstart={onIntrostart}
        on:introend={onIntroend}
        on:outrostart={onOutrostart}
        on:outroend={onOutroend}
      >
        <div class="dialog__content" bind:this={contentEl} use:action>
          {#if $$slots.header}
            <div class="dialog__header">
              <slot name="header" />
            </div>
          {/if}
          {#if closeButton}
            <button
              class="dialog__close"
              type="button"
              aria-label="Close"
              {...closeButton}
              on:click={close}
            >
              <slot name="close-icon">
                <svg viewBox="0 0 371.23 371.23" aria-hidden="true">
                  <path
                    d="M371.23 21.213L350.018 0 185.615 164.402 21.213 0 0
                21.213l164.402 164.402L0 350.018l21.213 21.212
                164.402-164.402L350.018 371.23l21.212-21.212-164.402-164.403z"
                  />
                </svg>
              </slot>
            </button>
          {/if}
          <div class="dialog__body">
            <slot {close} />
          </div>
          {#if $$slots.footer}
            <div class="dialog__footer">
              <slot name="footer" />
            </div>
          {/if}
        </div>
      </div>
    </div>
    <slot name="backdrop" {open}>
      <Backdrop {open} />
    </slot>
  </div>
{/if}

<style lang="postcss" global>
  $dialog-z-index: var(--z-index-modal, 1300);

  .dialog-container {
    position: relative;
    z-index: var(--dialog-z-index, $dialog-z-index);
  }

  .dialog {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow-x: hidden;
    overflow-y: overlay;
    z-index: var(--dialog-z-index, $dialog-z-index);
    outline: 0;
    display: flex;
    padding: 24px;

    @media (max-width: 575px) {
      padding: 8px;
    }

    &__container {
      margin: auto;
      will-change: transform, opacity;
      min-width: 0;
    }
    &_scrollable &__container {
      display: flex;
      max-height: 100%;
    }
    &__content {
      position: relative;
      background-color: #ffffff;
      box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2),
        0px 24px 38px 3px rgba(0, 0, 0, 0.14),
        0px 9px 46px 8px rgba(0, 0, 0, 0.12);
      border-radius: 4px;
      width: 710px;
      max-width: 100%;
      display: flex;
      flex-direction: column;
    }
    &__header {
      display: flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: space-between;
      padding: 16px 24px;
      border-top-left-radius: inherit;
      border-top-right-radius: inherit;
    }
    &__body {
      flex-grow: 1;
      padding: 8px 24px;
    }
    &_scrollable &__body {
      overflow-x: hidden;
      overflow-y: auto;
    }
    &__footer {
      display: flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: flex-end;
      padding: 16px 24px;
      border-bottom-left-radius: inherit;
      border-bottom-right-radius: inherit;
    }
    &__close {
      color: inherit;
      appearance: none;
      border: 0;
      padding: 8px;
      background-color: transparent;
      position: absolute;
      top: 16px;
      right: 16px;
      z-index: 100;
      cursor: pointer;
      font-size: 16px;
      border-radius: 4px;
      transition: box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1);
      -webkit-tap-highlight-color: transparent;

      @supports selector(:focus-visible) {
        outline: 0;

        &:focus-visible {
          box-shadow: 0 0 0 3px hsl(207 73% 57% / 60%);
        }
      }

      svg {
        display: block;
        height: 1em;
        width: auto;
        fill: currentColor;
        flex-shrink: 0;
      }
    }
  }
</style>

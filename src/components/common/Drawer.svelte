<script>
  import { createEventDispatcher, onMount, onDestroy, tick } from 'svelte'
  import { registerPopup, unregisterPopup, trapFocus } from '@/helpers/modal'
  import { portalAction } from '@/actions'
  import { easeOut, easeIn } from '@/utils'
  import Backdrop from './Backdrop.svelte'

  let className = ''
  export { className as class }
  export let id = ''
  export let open = false
  export let placement = 'end' // 'start' |'end' | 'top' | 'bottom'
  export let variant = ''
  export let inTransition = slide
  export let outTransition = slide
  export let closeAriaLabel = 'Close'
  export let getParentEl = () => document.body

  let el
  let returnFocusEl = null
  let mounted = false
  const drawer = {}
  const dispatch = createEventDispatcher()

  $: classes = [
    'drawer',
    `drawer_${placement}`,
    variant && `drawer_${variant}`,
    open && 'drawer_open',
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
    registerPopup(drawer)
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
    el.classList.remove('drawer_open')
  }
  function onOutroend() {
    dispatch('closed')
    tick().then(afterClose)
  }
  function afterClose() {
    returnFocusEl.focus?.()
    returnFocusEl = null
    unregisterPopup(drawer)
  }
  function slide(node, { duration, easing }) {
    return {
      duration,
      easing,
      css: (t, n) => {
        if (placement === 'start') {
          return `transform: translateX(${n * -100}%);`
        } else if (placement === 'end') {
          return `transform: translateX(${n * 100}%);`
        } else if (placement === 'top') {
          return `transform: translateY(${n * -100}%);`
        } else if (placement === 'bottom') {
          return `transform: translateY(${n * 100}%);`
        }
      }
    }
  }
  function onEsc(e) {
    if (e.key === 'Escape') {
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
    unregisterPopup(drawer)
  })
</script>

<svelte:window on:toggle-modal={id && onToggleModal} />

{#if open && mounted}
  <div class="drawer-container" use:portalAction={getParentEl()}>
    <div
      {id}
      class={classes}
      role="dialog"
      aria-modal="true"
      {...$$restProps}
      tabindex="-1"
      in:inTransition|local={{ duration: 200, easing: easeOut }}
      out:outTransition|local={{ duration: 150, easing: easeIn }}
      bind:this={el}
      on:keydown={onEsc}
      on:keydown={trapFocus}
      on:introstart={onIntrostart}
      on:introend={onIntroend}
      on:outrostart={onOutrostart}
      on:outroend={onOutroend}
    >
      <div class="drawer__content">
        <button
          class="drawer__close"
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
    <slot name="backdrop" {open} {close}>
      <Backdrop on:click={close} />
    </slot>
  </div>
{/if}

<style lang="postcss" global>
  .drawer-container {
    position: relative;
    z-index: var(--z-index-modal);
  }

  .drawer {
    background-color: #ffffff;
    position: fixed;
    overflow-y: auto;
    width: 340px;
    max-width: 100%;
    max-height: 100%;
    outline: 0;
    z-index: var(--z-index-modal);
    will-change: transform;

    &_start {
      top: 0;
      left: 0;
      bottom: 0;

      @supports (inset-inline-start: 0) {
        left: auto;
        inset-inline-start: 0;
      }
    }
    &_end {
      top: 0;
      right: 0;
      bottom: 0;

      @supports (inset-inline-end: 0) {
        right: auto;
        inset-inline-end: 0;
      }
    }
    &_top {
      top: 0;
      right: 0;
      left: 0;
      width: auto;
    }
    &_bottom {
      right: 0;
      left: 0;
      bottom: 0;
      width: auto;
    }
    &_open {
      box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.2),
        0px 16px 24px 2px rgba(0, 0, 0, 0.14),
        0px 6px 30px 5px rgba(0, 0, 0, 0.12);
    }

    &__content {
      min-height: 100%;
      display: flex;
      flex-direction: column;
      position: relative;
      padding: 24px 28px 28px;
    }
    &__close {
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

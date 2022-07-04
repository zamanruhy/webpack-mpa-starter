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
  export let placement = 'right' // 'left' |'right' | 'top' | 'bottom'
  export let variant = ''
  export let transition = slide
  export let inTransition = transition
  export let outTransition = transition
  export let closeButton = true // bool | object
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
    registerModal(drawer)
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
    unregisterModal(drawer)
  }
  function slide(node, { duration, easing }) {
    return {
      duration,
      easing,
      css: (t, n) => {
        if (placement === 'left') {
          return `transform: translateX(${n * -100}%);`
        } else if (placement === 'right') {
          return `transform: translateX(${n * 100}%);`
        } else if (placement === 'top') {
          return `transform: translateY(${n * -100}%);`
        } else if (placement === 'bottom') {
          return `transform: translateY(${n * 100}%);`
        }
      }
    }
  }
  function onEscape(e) {
    if (e.key === 'Escape') {
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
    unregisterModal(drawer)
  })
</script>

{#if open && mounted}
  <div class="drawer-container" use:portalAction={getParentEl()}>
    <div
      {id}
      class={classes}
      role="dialog"
      aria-modal="true"
      {...$$restProps}
      tabindex="-1"
      in:inTransition={{ duration: 200, easing: easeOut, placement }}
      out:outTransition={{ duration: 150, easing: easeOut, placement }}
      bind:this={el}
      on:keydown={onEscape}
      on:keydown={trapFocus}
      on:introstart={onIntrostart}
      on:introend={onIntroend}
      on:outrostart={onOutrostart}
      on:outroend={onOutroend}
    >
      <div class="drawer__content">
        {#if $$slots.header}
          <div class="drawer__header">
            <slot name="header" />
          </div>
        {/if}
        {#if closeButton}
          <button
            class="drawer__close"
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
        <div class="drawer__body">
          <slot {close} />
        </div>
        {#if $$slots.footer}
          <div class="drawer__footer">
            <slot name="footer" />
          </div>
        {/if}
      </div>
    </div>
    <slot name="backdrop" {open} {close}>
      <Backdrop {open} on:click={close} />
    </slot>
  </div>
{/if}

<style lang="postcss" global>
  $drawer-z-index: var(--z-index-modal, 1300);

  .drawer-container {
    position: relative;
    z-index: var(--drawer-z-index, $drawer-z-index);
  }

  .drawer {
    background-color: #ffffff;
    position: fixed;
    width: 340px;
    max-width: 100%;
    max-height: 100%;
    outline: 0;
    z-index: var(--drawer-z-index, $drawer-z-index);
    will-change: transform;

    &_left {
      top: 0;
      left: 0;
      bottom: 0;
    }
    &_right {
      top: 0;
      right: 0;
      bottom: 0;
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
      height: 100%;
      display: flex;
      flex-direction: column;
      position: relative;
    }
    &__header {
      display: flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: space-between;
      padding: 16px 24px;
    }
    &__body {
      flex-grow: 1;
      padding: 8px 24px;

      overflow-x: hidden;
      overflow-y: auto;
    }
    &__footer {
      display: flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: flex-end;
      padding: 16px 24px;
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

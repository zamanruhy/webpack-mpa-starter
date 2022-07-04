<script>
  import { createEventDispatcher } from 'svelte'
  import { focusVisibleAction } from '@/actions'

  let className = ''
  export { className as class }
  export let active = false
  export let action = () => {}

  let focusVisible = false
  const dispatch = createEventDispatcher()

  $: dispatch('update', active)
</script>

<button
  class="hamburger {className}"
  class:hamburger_active={active}
  class:hamburger_focus-visible={focusVisible}
  type="button"
  aria-label="Toggle menu"
  {...$$restProps}
  use:action
  use:focusVisibleAction={(v) => (focusVisible = v)}
  on:click|preventDefault={() => (active = !active)}
>
  <span class="hamburger__bar" />
  <span class="hamburger__bar" />
  <span class="hamburger__bar" />
</button>

<style lang="postcss" global>
  $hamburger-width: 24px;
  $hamburger-height: 20px;
  $hamburger-bar-height: 2px;

  .hamburger {
    color: inherit;
    appearance: none;
    border: 0;
    outline: 0;
    padding: 0;
    background-color: transparent;
    box-sizing: content-box;
    width: var(--hamburger-width, $hamburger-width);
    height: var(--hamburger-height, $hamburger-height);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    position: relative;
    isolation: isolate;
    -webkit-tap-highlight-color: transparent;

    &:before {
      content: '';
      display: block;
      position: absolute;
      width: 42px;
      height: 42px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      z-index: -1;
      background-color: currentColor;
      opacity: 0;
      transition: 200ms cubic-bezier(0.4, 0, 0.2, 1);
      transition-property: opacity;
    }
    &_focus-visible::before {
      opacity: 0.2;
    }

    &__bar {
      height: var(--hamburger-bar-height, $hamburger-bar-height);
      background-color: currentColor;
      width: var(--hamburger-width, $hamburger-width);
      display: block;
      transition: 200ms cubic-bezier(0.4, 0, 0.2, 1);
      transition-property: transform;
      will-change: transform;
      position: relative;

      &:nth-child(2) {
        transition-property: opacity;
        will-change: opacity;
      }
    }

    &_active &__bar {
      &:nth-child(1) {
        transform: translateY(
            calc(
              (
                  var(--hamburger-height, $hamburger-height) -
                    var(--hamburger-bar-height, $hamburger-bar-height)
                ) / 2
            )
          )
          rotate(45deg) scaleX(1.1);
      }
      &:nth-child(3) {
        transform: translateY(
            calc(
              (
                  var(--hamburger-height, $hamburger-height) -
                    var(--hamburger-bar-height, $hamburger-bar-height)
                ) / -2
            )
          )
          rotate(-45deg) scaleX(1.1);
      }
      &:nth-child(2) {
        opacity: 0;
      }
    }
  }
</style>

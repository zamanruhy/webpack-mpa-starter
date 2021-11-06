<script>
  import { createEventDispatcher } from 'svelte'

  let className = ''
  export { className as class }
  export let active = false

  const dispatch = createEventDispatcher()

  $: dispatch('update', active)

  function onClick() {
    active = !active
  }
</script>

<button
  class="hamburger {className}"
  class:hamburger_active={active}
  type="button"
  aria-label="Toggle menu"
  {...$$restProps}
  on:click|preventDefault={onClick}
>
  <span class="hamburger__bar" />
  <span class="hamburger__bar" />
  <span class="hamburger__bar" />
</button>

<style lang="postcss" global>
  .hamburger {
    --hamburger-width: 26px;
    --hamburger-height: 22px;
    --hamburger-bar-height: 2px;
    --hamburger-bar-offset: calc(
      (var(--hamburger-height) - var(--hamburger-bar-height)) / 2
    );
    --hamburger-transition: 150ms var(--ease-in-out, ease-in-out);

    width: var(--hamburger-width);
    height: var(--hamburger-height);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    position: relative;
    outline-offset: 4px;
    border-radius: 1px;
    color: inherit;
    -webkit-tap-highlight-color: transparent;

    &:before {
      content: '';
      display: block;
      position: absolute;
      width: max(30px, 100%);
      height: max(30px, 100%);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: inherit;

      @media (pointer: coarse) {
        width: 42px;
        height: 42px;
      }
    }

    &__bar {
      height: var(--hamburger-bar-height);
      background-color: currentColor;
      width: 100%;
      display: block;
      border-radius: 0px;
      transition: var(--hamburger-transition);
      transition-property: transform;
      will-change: transform;
      position: relative;

      &:nth-child(2) {
        transition-property: opacity;
        will-change: opacity;
        margin: auto 0;
      }
    }

    &_active &__bar {
      &:nth-child(1) {
        transform: translateY(var(--hamburger-bar-offset)) rotate(45deg)
          scaleX(1.1);
      }
      &:nth-child(3) {
        transform: translateY(calc(var(--hamburger-bar-offset) * -1))
          rotate(-45deg) scaleX(1.1);
      }
      &:nth-child(2) {
        opacity: 0;
      }
    }
  }
</style>

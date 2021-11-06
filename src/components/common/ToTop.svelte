<script>
  import { fade } from 'svelte/transition'
  import { easeInOut } from '@/utils'

  export let offset = 600
  export let transitionOptions = { duration: 250, easing: easeInOut }

  let scrollTop = 0

  $: active = scrollTop > offset

  function onScroll() {
    scrollTop = window.pageYOffset
  }

  function scrollToTop() {
    const currentScroll = window.pageYOffset
    if (currentScroll > 0) {
      requestAnimationFrame(scrollToTop)
      window.scrollTo(0, Math.floor(currentScroll - currentScroll / 5))
    }
  }
</script>

<svelte:window on:scroll={onScroll} />

{#if active}
  <button
    class="to-top"
    type="button"
    aria-label="Scroll to top"
    {...$$restProps}
    transition:fade={transitionOptions}
    on:click={scrollToTop}
  >
    <slot>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"
        />
      </svg>
    </slot>
  </button>
{/if}

<style lang="postcss" global>
  .to-top {
    width: 60px;
    height: 60px;
    background-color: var(--theme-color);
    border-radius: 50%;
    position: fixed;
    border: none;
    right: 40px;
    bottom: 40px;
    z-index: var(--z-index-fixed);
    transition: var(--transition);
    transition-property: background-color;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-size: 24px;
    -webkit-tap-highlight-color: transparent;

    @mixin down md {
      width: 55px;
      height: 55px;
      right: 20px;
      bottom: 20px;
    }

    svg {
      display: block;
      height: 1em;
      fill: currentColor;
    }
  }
</style>

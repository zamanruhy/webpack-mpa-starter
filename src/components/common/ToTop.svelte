<script>
  import { fade } from 'svelte/transition'
  import { fastOutSlowIn } from '@/utils'

  let offset = 600
  let scrollTop = window.pageYOffset
  const fadeOptions = { duration: 250, easing: fastOutSlowIn }

  $: visible = scrollTop > offset

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

{#if visible}
  <button
    class="to-top"
    type="button"
    aria-label="Scroll to top"
    data-fixed="margin"
    transition:fade={fadeOptions}
    on:click={scrollToTop}
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 447.243 447.243">
      <path
        d="M409.217 172.662a32.018 32.018 0 0
        0-2.754-3.276l-160-160c-12.49-12.505-32.751-12.516-45.254-.026l-.025.025-160
        160c-12.479 12.514-12.451 32.775.063 45.255a32.084 32.084 0 0 0 3.137
        2.745c13.381 8.971 31.276 7.013 42.4-4.64l88.64-88.32a64.002 64.002 0 0
        0 11.68-16l4.32-9.6v314.24c-.607 16.347 10.812 30.689 26.88 33.76 17.445
        2.829 33.881-9.019 36.71-26.465.297-1.83.434-3.682.41-5.535V99.305l3.2
        6.88a63.998 63.998 0 0 0 12.8 18.08l88.48 88.48c11.124 11.653 29.019
        13.611 42.4 4.64 14.259-10.441 17.354-30.464 6.913-44.723z"
      />
    </svg>
  </button>
{/if}

<style lang="postcss" global>
  .to-top {
    width: 60px;
    height: 60px;
    background-color: $color-primary;
    border-radius: 50%;
    position: fixed;
    border: none;
    right: 40px;
    bottom: 40px;
    z-index: calc(var(--z-index-sticky) - 1);
    transition: var(--transition);
    transition-property: background-color;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-size: 18px;

    @mixin down md {
      width: 55px;
      height: 55px;
      right: 20px;
      bottom: 20px;
    }

    &:hover {
      background-color: lighten($color-primary, 0.05);
      border-color: lighten($color-primary, 0.05);
    }

    &:active {
      background-color: darken($color-primary, 0.05);
      border-color: darken($color-primary, 0.05);
      padding: 0;
    }

    svg {
      fill: currentColor;
      height: 1em;
      vertical-align: middle;
    }
  }
</style>

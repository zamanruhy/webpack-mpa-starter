<script>
  import { easeInOut } from '@/utils'

  export let open = false
  export let transition = fade
  export let inTransition = transition
  export let outTransition = transition

  function fade(node, options) {
    return {
      ...options,
      css: (t, n) => `opacity: ${t};`
    }
  }
</script>

{#if open}
  <div
    class="backdrop"
    in:inTransition={{ duration: 200, easing: easeInOut }}
    out:outTransition={{ duration: 150, easing: easeInOut }}
    on:click
  />
{/if}

<style lang="postcss" global>
  $backdrop-z-index: var(--z-index-backdrop, 1200);

  .backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: var(--backdrop-z-index, $backdrop-z-index);
    background-color: rgba(0, 0, 0, 0.5);
    will-change: opacity;
  }
</style>

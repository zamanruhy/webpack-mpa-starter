<script>
  import { fade } from 'svelte/transition'
  import { easeInOut } from '@/utils'

  export let inTransition = fade
  export let outTransition = fade
</script>

<div
  class="backdrop"
  in:inTransition|local={{ duration: 200, easing: easeInOut }}
  out:outTransition|local={{ duration: 150, easing: easeInOut }}
  on:click
/>

<style lang="postcss" global>
  .backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: var(--z-index-backdrop);
    background-color: rgba(0, 0, 0, 0.48);
    will-change: opacity;
  }
</style>

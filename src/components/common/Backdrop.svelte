<script>
  import { fade } from 'svelte/transition'
  import { fastOutSlowIn } from '@/utils'

  export let visible = false

  const fadeOptions = { duration: 300, easing: fastOutSlowIn }
</script>

{#if visible}
  <div class="backdrop" transition:fade={fadeOptions} on:click />
{/if}

<style lang="scss" global>
  .backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: map-get($z-indexes, backdrop);
    background-color: #212121;
    opacity: 0.46;
    will-change: opacity;
  }
</style>

<script>
  import { createEventDispatcher, onMount } from 'svelte'
  import { slide } from 'svelte/transition'
  import { dispatchEvent, easing } from '@/utils'

  export let id = ''
  export let accordion = ''
  export let visible = false

  let mounted = false
  const dispatch = createEventDispatcher()
  const slideOptions = { duration: 300, easing: easing.fastOutSlowIn }

  $: dispatch('update', visible)
  $: if (id && mounted) {
    dispatchEvent(window, 'collapse:update', { id, visible })
    if (accordion && visible) {
      dispatchEvent(window, 'collapse:accordion', { id, accordion })
    }
  }

  function toggleHandler({ detail }) {
    if (id === detail.id) {
      visible = !visible
    }
  }
  function accordionHandler({ detail }) {
    if (id && id !== detail.id && accordion === detail.accordion) {
      visible = false
    }
  }
  function onOpen() {
    dispatch('open')
  }
  function onOpened() {
    dispatch('opened')
  }
  function onClose() {
    dispatch('close')
  }
  function onClosed() {
    dispatch('closed')
  }

  onMount(() => {
    mounted = true
  })
</script>

<svelte:window
  on:toggle:collapse={toggleHandler}
  on:collapse:accordion={accordionHandler}
/>

{#if visible}
  <div
    {id}
    transition:slide|local={slideOptions}
    on:introstart={onOpen}
    on:introend={onOpened}
    on:outrostart={onClose}
    on:outroend={onClosed}
  >
    <slot />
  </div>
{/if}

<style lang="scss" global>
  app-collapse:defined {
    display: contents;
  }

  app-collapse:not(:defined) {
    display: block;

    &:not([visible]) {
      display: none;
    }
  }
</style>

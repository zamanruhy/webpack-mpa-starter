<script>
  import { createEventDispatcher, onMount } from 'svelte'
  import { slide } from 'svelte/transition'
  import { fastOutSlowIn } from '@/utils'

  export let id = ''
  export let accordion = ''
  export let visible = false

  let mounted = false
  const dispatch = createEventDispatcher()
  const slideOptions = { duration: 300, easing: fastOutSlowIn }

  $: dispatch('update', visible)
  $: if (id && mounted) {
    window.dispatchEvent(
      new CustomEvent('collapse-update', { detail: { id, visible } })
    )
    if (accordion && visible) {
      window.dispatchEvent(
        new CustomEvent('collapse-accordion', { detail: { id, accordion } })
      )
    }
  }

  function toggleHandler({ detail }) {
    if (id === detail.id) {
      visible = !visible
    }
  }
  function accordionHandler({ detail }) {
    if (id !== detail.id && accordion === detail.accordion) {
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
  on:toggle-collapse={id ? toggleHandler : null}
  on:collapse-accordion={id && accordion ? accordionHandler : null}
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

<style lang="postcss" global></style>

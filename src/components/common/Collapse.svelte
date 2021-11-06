<script>
  import { createEventDispatcher, onMount } from 'svelte'
  import { slide } from 'svelte/transition'
  import { easeInOut } from '@/utils'

  export let id = ''
  export let accordion = ''
  export let open = false
  export let transitionOptions = { duration: 300, easing: easeInOut }

  let mounted = false
  const dispatch = createEventDispatcher()

  $: dispatch('update', open)
  $: if (id && mounted) {
    window.dispatchEvent(
      new CustomEvent('collapse-update', { detail: { id, open } })
    )
    if (accordion && open) {
      window.dispatchEvent(
        new CustomEvent('collapse-accordion', { detail: { id, accordion } })
      )
    }
  }

  function onIntrostart() {
    dispatch('open')
  }
  function onIntroend() {
    dispatch('opened')
  }
  function onOutrostart() {
    dispatch('close')
  }
  function onOutroend() {
    dispatch('closed')
  }
  function onToggleCollapse({ detail }) {
    if (id === detail.id) {
      open = !open
    }
  }
  function onCollapseAccordion({ detail }) {
    if (accordion === detail.accordion && id !== detail.id) {
      open = false
    }
  }

  onMount(() => {
    mounted = true
  })
</script>

<svelte:window
  on:toggle-collapse={id && onToggleCollapse}
  on:collapse-accordion={id && accordion && onCollapseAccordion}
/>

{#if open}
  <div
    {id}
    transition:slide|local={transitionOptions}
    on:introstart={onIntrostart}
    on:introend={onIntroend}
    on:outrostart={onOutrostart}
    on:outroend={onOutroend}
  >
    <slot />
  </div>
{/if}

<style lang="postcss" global></style>

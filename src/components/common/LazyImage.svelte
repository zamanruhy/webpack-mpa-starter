<script>
  import { createEventDispatcher } from 'svelte'
  import { intersect } from '@/actions'

  export let src = ''
  export let srcset = ''
  export let srcPlaceholder = ''
  export let picture = false
  export let width = 0
  export let height = 0

  let el
  let loaded = false
  let intersected = !intersect.support
  const dispatch = createEventDispatcher()

  $: srcImg =
    intersected && src ? src : srcPlaceholder || getDataUri(width, height)
  $: srcsetImg = intersected && srcset ? srcset : null
  $: attrs = {
    src: srcImg,
    srcset: srcsetImg,
    width: width || null,
    height: height || null,
    ...$$restProps
  }

  function getDataUri(width, height) {
    return `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 ${width} ${height}"%3E%3C/svg%3E`
  }
  function onIntersect({ detail }) {
    intersected = detail.intersecting
  }
  function onLoad() {
    if (el.getAttribute('src') === src) {
      loaded = true
      dispatch('load')
    }
  }
  function onError() {
    dispatch('error')
  }
</script>

<!-- svelte-ignore a11y-missing-attribute -->
{#if !picture}
  <img
    class:lazy-image={true}
    class:lazy-image_loaded={loaded}
    {...attrs}
    bind:this={el}
    use:intersect={{ once: true }}
    on:intersect={onIntersect}
    on:load={onLoad}
    on:error={onError}
  />
{:else}
  <picture>
    {#if intersected}
      <slot />
    {/if}
    <img
      class:lazy-image={true}
      class:lazy-image_loaded={loaded}
      {...attrs}
      bind:this={el}
      use:intersect={{ once: true }}
      on:intersect={onIntersect}
      on:load={onLoad}
      on:error={onError}
    />
  </picture>
{/if}

<style lang="scss" global>
  .lazy-image {
    display: block;
    filter: blur(6px);

    &_loaded {
      filter: none;
    }
  }

  app-lazy-image:defined {
    display: contents;
  }

  app-lazy-image:not(:defined) {
    display: block;
  }
</style>

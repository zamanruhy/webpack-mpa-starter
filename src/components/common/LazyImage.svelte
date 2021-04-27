<script>
  import { createEventDispatcher } from 'svelte'
  import { intersect } from '@/actions'

  let className = ''
  export { className as class }
  export let src
  export let srcset = null
  export let width = null
  export let height = null
  export let picture = false

  let el
  let loaded = false
  let intersected = false
  const dispatch = createEventDispatcher()

  $: srcPlaceholder =
    width && height
      ? `data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27
            viewBox=%270 0 ${width} ${height}%27%3E%3C/svg%3E`
      : 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
  $: srcImg = intersected && src ? src : srcPlaceholder
  $: srcsetImg = intersected && srcset ? srcset : null
  $: classes = ['lazy-image', loaded && 'lazy-image_loaded', className]
    .filter(Boolean)
    .join(' ')

  function onIntersect({ detail }) {
    intersected = detail.intersecting
  }
  function onLoad() {
    if (srcImg === src) {
      loaded = true
      dispatch('load')
    }
  }
  function onError() {
    dispatch('error')
  }
</script>

<noscript>
  <!-- svelte-ignore a11y-missing-attribute -->
  {#if !picture}
    <img class={className} {src} {srcset} {width} {height} {...$$restProps} />
    <style>
      noscript + img.lazy-image {
        display: none !important;
      }
    </style>
  {:else}
    <picture>
      <slot />
      <img class={className} {src} {srcset} {width} {height} {...$$restProps} />
    </picture>
    <style>
      noscript + picture img.lazy-image {
        display: none !important;
      }
    </style>
  {/if}
</noscript>

<!-- svelte-ignore a11y-missing-attribute -->
{#if !picture}
  <img
    class={classes}
    src={srcImg}
    srcset={srcsetImg}
    {width}
    {height}
    {...$$restProps}
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
      class={classes}
      src={srcImg}
      srcset={srcsetImg}
      {width}
      {height}
      {...$$restProps}
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
    &_loaded {
    }
  }
  app-lazy-image:defined {
    display: contents;
  }

  app-lazy-image:not(:defined) {
    display: block;
  }
</style>

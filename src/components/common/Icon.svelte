<script>
  let className = ''
  export { className as class }
  export let data
  export let img = false

  $: ({ id, viewBox, url } = data)
  $: [width, height] = viewBox.split(' ').slice(-2).map(Number)
  $: name = id.replace(/^icon-|-usage$/g, '')
  $: classes = ['icon', `icon_${name}`, className].filter(Boolean).join(' ')
</script>

{#if img}
  <img
    class={classes}
    src={url}
    {width}
    {height}
    alt=""
    aria-hidden="true"
    {...$$restProps}
    on:click
  />
{:else}
  <svg class={classes} {viewBox} aria-hidden="true" {...$$restProps} on:click>
    <use xlink:href={url.replace('-usage', '')} />
  </svg>
{/if}

<style lang="postcss" global>
  .icon {
    display: inline-block;
    vertical-align: middle;
    flex: 0 0 auto;
    height: 1em;
    fill: currentColor;
  }

  img.icon {
    width: auto;
    max-width: none;
  }
</style>

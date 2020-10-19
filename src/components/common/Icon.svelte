<script context="module">
  import icons from '@/components/icon/icon'
</script>

<script>
  let className = ''
  export { className as class }
  export let name = ''
  export let left = false
  export let right = false
  export let img = false

  $: icon = icons[name] || {}
  $: ({ id, width, height } = icon)
  $: url = `static/img/sprite.svg#${id}`
  $: style = `height: 1em; width: ${width / height}em`
  $: classes = [
    'icon',
    `icon_${name}`,
    left && 'icon_left',
    right && 'icon_right',
    className
  ]
    .filter((c) => c)
    .join(' ')
</script>

{#if img}
  <img class={classes} {style} src={url} alt={name} {...$$restProps} on:click />
{:else}
  <svg class={classes} {style} {...$$restProps} on:click>
    <use xlink:href={url.replace('-usage', '')} />
  </svg>
{/if}

<style lang="scss" global>
  .icon {
    display: inline-block;
    vertical-align: middle;
    flex: 0 0 auto;
    height: 1em;
    fill: currentColor;

    &_left {
      margin-right: 0.4em;
    }
    &_right {
      margin-left: 0.4em;
    }
  }
</style>

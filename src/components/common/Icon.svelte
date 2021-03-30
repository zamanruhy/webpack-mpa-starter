<script context="module">
  const icons = {}
  const requireIcon = require.context('@/assets/svg', false, /\.svg$/)
  requireIcon.keys().forEach((fileName) => {
    const iconConfig = requireIcon(fileName)
    const { id, viewBox, url } = iconConfig.default || iconConfig
    const iconName = fileName.replace(/^\.\/|\.\w+$/g, '')
    const [width, height] = viewBox.split(' ').slice(-2).map(Number)
    icons[iconName] = { id, width, height, url }
  })
  export { icons }
</script>

<script>
  let className = ''
  export { className as class }
  export let style = ''
  export let name = ''
  export let left = false
  export let right = false
  export let img = false

  $: icon = getIcon(name)
  $: ({ id, width, height } = icon)
  $: url = `static/img/sprite.svg#${id}`
  $: styles = `
    ${style ? `${style};` : ''}
    height: 1em;
    width: ${width / height}em
  `
  $: classes = [
    'icon',
    `icon_${name}`,
    left && 'icon_left',
    right && 'icon_right',
    className
  ]
    .filter(Boolean)
    .join(' ')

  function getIcon(n) {
    return icons[n] || {}
  }
</script>

{#if img}
  <img
    class={classes}
    style={styles}
    src={url}
    alt={name}
    {...$$restProps}
    on:click
  />
{:else}
  <svg class={classes} style={styles} {...$$restProps} on:click>
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

<script>
  import Spinner from './Spinner.svelte'
  import { actions } from '@/actions'

  let className = ''
  export { className as class }
  export let size = ''
  export let variant = ''
  export let loading = false
  export let type = 'button'
  export let href = ''
  export let use = []
  export let el = undefined

  $: classes = [
    'button',
    variant && `button_${variant}`,
    size && `button_${size}`,
    loading && 'button_loading',
    className
  ]
    .filter(Boolean)
    .join(' ')
</script>

{#if href}
  <a
    class={classes}
    {href}
    {...$$restProps}
    bind:this={el}
    use:actions={use}
    on:click
  >
    <span class="button__content">
      <slot />
    </span>
    {#if loading}
      <Spinner size={23} width={2} class="button__spinner" />
    {/if}
  </a>
{:else}
  <button
    class={classes}
    {type}
    {...$$restProps}
    bind:this={el}
    use:actions={use}
    on:click
  >
    <span class="button__content">
      <slot />
    </span>
    {#if loading}
      <Spinner size={23} width={2} class="button__spinner" />
    {/if}
  </button>
{/if}

<style lang="scss" global>
  .button {
    cursor: pointer;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
    text-align: center;
    color: $body-color;
    user-select: none;
    background-color: transparent;
    border: 1px solid transparent;
    line-height: $line-height;
    font-size: 16px;
    padding: 6px 12px;
    border-radius: 4px;
    transition: 0.25s map-get($easings, fast-out-slow-in);
    transition-property: color, background-color, border-color, box-shadow;
    max-width: 100%;
    min-width: 48px;
    flex: 0 0 auto;
    position: relative;

    &:hover {
      text-decoration: none;
    }

    &:focus-visible {
      z-index: 1;
    }

    &[disabled] {
      pointer-events: none;
      opacity: 0.65;
    }

    &_primary {
      color: #ffffff;
      background-color: $color-primary;
      border-color: $color-primary;

      &:hover {
        background-color: lighten($color-primary, 4%);
        border-color: lighten($color-primary, 4%);
      }

      &:active {
        background-color: darken($color-primary, 4%);
        border-color: darken($color-primary, 4%);
      }
    }

    &_small {
      padding: 4px 8px;
      font-size: 14px;
      border-radius: 3px;
    }

    &_large {
      padding: 8px 16px;
      font-size: 20px;
      border-radius: 5px;
    }

    &_loading {
      pointer-events: none;
      transition: none;
    }

    &__content {
      align-items: center;
      display: flex;
      flex: 1 0 auto;
      justify-content: inherit;
    }

    &_loading &__content {
      opacity: 0;
    }

    &__spinner.spinner {
      display: flex;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>

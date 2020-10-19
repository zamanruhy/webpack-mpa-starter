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
  export let el = null

  $: classes = [
    'button',
    variant && `button_${variant}`,
    size && `button_${size}`,
    loading && 'button_loading',
    className
  ]
    .filter((c) => c)
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
    transition: $transition;
    transition-property: color, background-color, border-color, box-shadow;
    max-width: 100%;
    min-width: 48px;
    flex: 0 0 auto;
    position: relative;

    &:hover {
      text-decoration: none;
    }

    &[disabled] {
      pointer-events: none;
      opacity: 0.65;
    }

    &_primary {
      color: #ffffff;
      background-color: $primary;
      border-color: $primary;

      &:hover {
        background-color: lighten($primary, 4%);
        border-color: lighten($primary, 4%);
      }

      &:active {
        background-color: darken($primary, 4%);
        border-color: darken($primary, 4%);
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

    &__spinner {
      display: flex;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  app-button:defined {
    display: inline-flex;
    vertical-align: middle;
  }

  app-button:not(:defined) {
    @extend .button;
    -webkit-appearance: none !important;

    &[variant='primary'] {
      @extend .button_primary;
    }

    &[size='small'] {
      @extend .button_small;
    }

    &[size='large'] {
      @extend .button_large;
    }
  }

  app-file-input:not(:defined) {
    &:after {
      @extend .button;
      @extend .button_primary;
    }
  }
</style>

<script>
  import Spinner from './Spinner.svelte'
  import { actionsAction } from '@/actions'

  let className = ''
  export { className as class }
  export let size = ''
  export let variant = ''
  export let loading = false
  export let type = 'button'
  export let href = ''
  export let use = null
  export let disabled = false
  export let el = undefined

  $: classes = [
    'button',
    variant && `button_${variant}`,
    size && `button_${size}`,
    disabled && 'button_disabled',
    loading && 'button_loading',
    className
  ]
    .filter(Boolean)
    .join(' ')
</script>

{#if href}
  <a
    class={classes}
    href={disabled ? undefined : href}
    {...$$restProps}
    bind:this={el}
    use:actionsAction={use}
    on:click
  >
    <span class="button__content">
      <slot />
    </span>
    {#if loading}
      <slot name="loading">
        <Spinner size={23} width={2} class="button__spinner" />
      </slot>
    {/if}
  </a>
{:else}
  <button
    class={classes}
    {type}
    {disabled}
    {...$$restProps}
    bind:this={el}
    use:actionsAction={use}
    on:click
  >
    <span class="button__content">
      <slot />
    </span>
    {#if loading}
      <slot name="loading">
        <Spinner size={23} width={2} class="button__spinner" />
      </slot>
    {/if}
  </button>
{/if}

<style lang="postcss" global>
  .button {
    font: inherit;
    cursor: pointer;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
    text-align: center;
    color: #ffffff;
    user-select: none;
    background-color: var(--theme-color, darkcyan);
    border: 1px solid transparent;
    font-size: 16px;
    padding: 6px 12px;
    border-radius: 4px;
    transition: 250ms cubic-bezier(0.4, 0, 0.2, 1);
    transition-property: color, background-color, border-color, box-shadow;
    max-width: 100%;
    flex: 0 0 auto;
    position: relative;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      text-decoration: none;
    }

    &_disabled {
      pointer-events: none;
      opacity: 0.65;
    }

    &_loading {
      pointer-events: none;
      transition: none;
    }

    &__content {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &_loading &__content {
      opacity: 0;
    }

    &__spinner.spinner {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>

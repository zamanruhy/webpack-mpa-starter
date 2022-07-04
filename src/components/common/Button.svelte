<script>
  import { get_current_component } from 'svelte/internal'
  import Spinner from './Spinner.svelte'
  import { eventsAction, focusVisibleAction } from '@/actions'

  let className = ''
  export { className as class }
  export let size = ''
  export let variant = ''
  export let loading = false
  export let type = 'button'
  export let href = ''
  export let action = () => {}
  export let disabled = false
  export let el = undefined

  let focusVisible = false
  const component = get_current_component()

  $: classes = [
    'button',
    variant && `button_${variant}`,
    size && `button_${size}`,
    loading && 'button_loading',
    disabled && 'button_disabled',
    focusVisible && 'button_focus-visible',
    className
  ]
    .filter(Boolean)
    .join(' ')
</script>

{#if href}
  <a
    class={classes}
    href={disabled || loading ? null : href}
    aria-disabled={disabled || loading || null}
    {...$$restProps}
    bind:this={el}
    use:action
    use:eventsAction={component}
    use:focusVisibleAction={(v) => (focusVisible = v)}
  >
    <span class="button__content">
      <slot />
    </span>
    {#if loading}
      <span class="button__spinner">
        <slot name="spinner">
          <Spinner size={22} width={2} />
        </slot>
      </span>
    {/if}
  </a>
{:else}
  <button
    class={classes}
    {type}
    disabled={disabled || loading}
    {...$$restProps}
    bind:this={el}
    use:action
    use:eventsAction={component}
    use:focusVisibleAction={(v) => (focusVisible = v)}
  >
    <span class="button__content">
      <slot />
    </span>
    {#if loading}
      <span class="button__spinner">
        <slot name="spinner">
          <Spinner size={22} width={2} />
        </slot>
      </span>
    {/if}
  </button>
{/if}

<style lang="postcss" global>
  .button {
    font: inherit;
    appearance: none;
    text-transform: none;
    outline: 0;
    box-sizing: border-box;
    cursor: pointer;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    vertical-align: middle;
    text-align: center;
    color: #ffffff;
    user-select: none;
    background-color: var(--color-theme, darkcyan);
    border: 1px solid transparent;
    font-size: 16px;
    padding: 6px 16px;
    border-radius: 4px;
    transition: 250ms cubic-bezier(0.4, 0, 0.2, 1);
    transition-property: transform, opacity, background-color, color,
      border-color, outline, box-shadow;
    max-width: 100%;
    flex-shrink: 0;
    position: relative;
    -webkit-tap-highlight-color: transparent;
    isolation: isolate;

    &:hover {
      text-decoration: none;
    }
    &_focus-visible {
      box-shadow: 0 0 0 3px hsl(207 73% 57% / 60%);
    }
    &_disabled {
      pointer-events: none;
      cursor: default;
      background: hsl(218 23% 23% / 0.15);
      color: hsl(218 23% 23% / 0.5);
    }
    &_loading {
      pointer-events: none;
      cursor: default;
    }

    &__content {
      display: inherit;
      align-items: inherit;
      justify-content: inherit;
      gap: inherit;

      svg {
        display: block;
        height: 1em;
        width: auto;
        fill: currentColor;
        flex-shrink: 0;
      }
    }
    &_loading &__content {
      opacity: 0;
    }
    &__spinner {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>

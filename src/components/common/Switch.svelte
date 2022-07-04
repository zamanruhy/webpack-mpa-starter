<script>
  import { get_current_component } from 'svelte/internal'
  import { eventsAction, focusVisibleAction } from '@/actions'

  let className = ''
  export { className as class }
  export let size = ''
  export let variant = ''
  export let style = undefined
  export let value = undefined
  export let checked = false
  export let disabled = false
  export let group = undefined
  export let label = ''
  export let id = undefined
  export let name = undefined
  export let inputEl = undefined

  let focusVisible = false
  const component = get_current_component()

  $: if (Array.isArray(group)) {
    checked = group.includes(value)
  }

  $: classes = [
    'switch',
    variant && `switch_${variant}`,
    size && `switch_${size}`,
    checked && 'switch_checked',
    disabled && 'switch_disabled',
    focusVisible && 'switch_focus-visible',
    className
  ]
    .filter(Boolean)
    .join(' ')

  function handleChange(e) {
    const on = e.target.checked

    if (Array.isArray(group)) {
      if (on && !group.includes(value)) {
        group = group.concat([value])
      } else if (!on && group.includes(value)) {
        group = group.filter((v) => v !== value)
      }
    } else {
      checked = on
    }
  }
</script>

<label class={classes} {style}>
  <input
    class="switch__input"
    type="checkbox"
    {id}
    {checked}
    {value}
    {disabled}
    {name}
    role="switch"
    {...$$restProps}
    bind:this={inputEl}
    use:eventsAction={component}
    use:focusVisibleAction={(v) => (focusVisible = v)}
    on:change={handleChange}
  />
  <span class="switch__track" aria-hidden="true">
    <slot name="track" {checked} {disabled} />
    <span class="switch__thumb">
      <slot name="thumb" {checked} {disabled} />
    </span>
  </span>

  {#if $$slots.default || label}
    <span class="switch__label">
      <slot {disabled}>{label}</slot>
    </span>
  {/if}
</label>

<style lang="postcss" global>
  $switch-width: 40px;
  $switch-height: 20px;
  $switch-thumb-size: 16px;
  $switch-thumb-left: calc(
    (
        var(--switch-height, $switch-height) -
          var(--switch-thumb-size, $switch-thumb-size)
      ) / 2
  );

  .switch {
    display: flex;
    align-items: center;
    width: fit-content;
    user-select: none;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    isolation: isolate;
    position: relative;

    &_disabled {
      pointer-events: none;
      cursor: default;
      opacity: 0.6;
    }

    &__input {
      @mixin visually-hidden;
    }
    &__track {
      position: relative;
      border-radius: 100px;
      width: var(--switch-width, $switch-width);
      height: var(--switch-height, $switch-height);
      flex-shrink: 0;
      background-color: hsl(211 25% 84%);
      transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
      transition-property: transform, opacity, background-color, color,
        border-color, outline, box-shadow;

      &::before {
        content: '';
        position: absolute;
        width: max(40px, var(--switch-width, $switch-width));
        height: max(40px, var(--switch-height, $switch-height));
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: inherit;
        z-index: -1;
      }

      svg {
        display: block;
        height: 1em;
        width: auto;
        fill: currentColor;
        flex-shrink: 0;
      }
    }
    &_checked &__track {
      background-color: var(--accent-color, var(--color-theme, darkcyan));
    }
    &_focus-visible &__track {
      box-shadow: 0 0 0 3px hsl(207 73% 57% / 60%);
    }
    &__thumb {
      width: var(--switch-thumb-size, $switch-thumb-size);
      height: var(--switch-thumb-size, $switch-thumb-size);
      position: absolute;
      top: 50%;
      margin-top: calc(var(--switch-thumb-size, $switch-thumb-size) / -2);
      left: 50%;
      margin-left: calc(
        var(--switch-width, $switch-width) / -2 +
          var(--switch-thumb-left, $switch-thumb-left)
      );
      border-radius: inherit;
      background-color: #ffffff;
      /* outline-color: transparent; */
      transition: inherit;
    }
    &_checked &__thumb {
      transform: translateX(
        calc(
          var(--switch-width, $switch-width) -
            var(--switch-thumb-left, $switch-thumb-left) * 2 -
            var(--switch-thumb-size, $switch-thumb-size)
        )
      );
    }
    &__label {
      display: inline-block;
      flex: 0 1 auto;
      margin-inline-start: 8px;
    }
  }
</style>

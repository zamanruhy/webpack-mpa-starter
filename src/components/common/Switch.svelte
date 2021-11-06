<svelte:options immutable />

<script>
  import { focusVisibleAction } from '@/actions'

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
    use:focusVisibleAction={(v) => (focusVisible = v)}
    on:change={handleChange}
    on:change
  />
  <span class="switch__base">
    <span class="switch__track">
      <slot name="track" {checked} {disabled} />
    </span>
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
  $switch-color: hsl(211 25% 84%);
  $switch-active-color: var(--accent-color, var(--theme-color, darkcyan));
  $switch-thumb-color: #ffffff;
  $switch-thumb-active-color: var(--switch-thumb-color, $switch-thumb-color);
  $switch-transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
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

    &_disabled {
      pointer-events: none;
      cursor: default;
    }

    &__input {
      @mixin visually-hidden;
    }
    &__base {
      position: relative;
      border-radius: calc(var(--switch-height, $switch-height) * 2);
      height: var(--switch-height, $switch-height);
      width: var(--switch-width, $switch-width);
      flex-shrink: 0;
      outline-color: transparent;
      transition: var(--switch-transition, $switch-transition);
      transition-property: outline-color, box-shadow;

      &::before {
        content: '';
        position: absolute;
        width: max(30px, 100%);
        height: max(30px, 100%);
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: inherit;
        z-index: -1;
      }
    }
    &_disabled &__base {
      opacity: 0.6;
    }
    &_focus-visible &__base {
      @mixin focus-ring;
    }
    &__track {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: inherit;
      background-color: var(--switch-color, $switch-color);
      border: 0 solid var(--switch-color, $switch-color);
      transition: var(--switch-transition, $switch-transition);
      transition-property: background-color, color, border-color;

      svg {
        display: block;
        height: 1em;
        fill: currentColor;
        flex-shrink: 0;
      }
    }
    &_checked &__track {
      background-color: var(--switch-active-color, $switch-active-color);
      border-color: var(--switch-active-color, $switch-active-color);
    }
    &__thumb {
      width: var(--switch-thumb-size, $switch-thumb-size);
      height: var(--switch-thumb-size, $switch-thumb-size);
      position: absolute;
      top: $switch-thumb-left;
      left: var(--switch-thumb-left, $switch-thumb-left);
      border-radius: inherit;
      background-color: var(--switch-thumb-color, $switch-thumb-color);
      outline-color: transparent;
      transition: var(--switch-transition, $switch-transition);
      transition-property: transform, background-color, color, border-color,
        outline-color, box-shadow;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        display: block;
        height: 1em;
        fill: currentColor;
        flex-shrink: 0;
      }
    }
    &_checked &__thumb {
      transform: translateX(
        calc(
          var(--switch-width, $switch-width) -
            var(--switch-thumb-left, $switch-thumb-left) * 2 -
            var(--switch-thumb-size, $switch-thumb-size)
        )
      );
      background-color: var(
        --switch-thumb-active-color,
        $switch-thumb-active-color
      );
    }
    &__label {
      display: inline-block;
      flex: 0 1 auto;
      margin-inline-start: 8px;
    }
    &_disabled &__label {
      opacity: 0.6;
    }
  }
</style>

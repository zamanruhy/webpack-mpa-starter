<svelte:options immutable />

<script>
  import { focusVisibleAction } from '@/actions'

  let className = ''
  export { className as class }
  export let style = ''
  export let value = ''
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
  .switch {
    --switch-width: 40px;
    --switch-height: 20px;
    --switch-color: var(--color-primary, darkcyan);
    --switch-transition: 0.15s var(--fast-out-slow-in, ease);
    --switch-thumb-size: 16px;
    --switch-thumb-left: var(--switch-thumb-top);
    --switch-thumb-top: calc(
      (var(--switch-height) - var(--switch-thumb-size)) / 2
    );
    --switch-thumb-translate: calc(
      var(--switch-width) - var(--switch-thumb-left) * 2 -
        var(--switch-thumb-size)
    );

    display: flex;
    align-items: center;
    width: fit-content;
    user-select: none;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;

    &_disabled {
      pointer-events: none;
      cursor: default;
    }

    &__input {
      @mixin visually-hidden;
    }
    &__base {
      display: inline-block;
      position: relative;
      border-radius: calc(var(--switch-height) / 2);
      height: var(--switch-height);
      width: var(--switch-width);
      flex: 0 0 auto;
    }
    &_focus-visible &__base {
      @mixin focus-ring;
    }
    &__track {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: inherit;
      background-color: #bfbfbf;
      transition: var(--switch-transition);
      transition-property: background-color, opacity;
    }
    &_checked &__track {
      background-color: var(--switch-color);
    }
    &_disabled &__track {
      opacity: 0.6;
    }
    &__thumb {
      position: absolute;
      top: var(--switch-thumb-top);
      left: var(--switch-thumb-left);
      width: var(--switch-thumb-size);
      height: var(--switch-thumb-size);
      border-radius: calc(var(--switch-thumb-size) / 2);
      background-color: #ffffff;
      transition: var(--switch-transition);
      transition-property: transform, background-color, width;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &_checked &__thumb {
      transform: translateX(var(--switch-thumb-translate));
    }
    &__label {
      display: inline-block;
      flex: 0 1 auto;
      margin-inline-start: 8px;
      transition: var(--switch-transition);
      transition-property: opacity;
    }
    &_disabled &__label {
      opacity: 0.5;
    }
  }
</style>

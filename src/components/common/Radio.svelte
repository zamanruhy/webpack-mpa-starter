<script>
  import { onMount } from 'svelte'
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

  $: if (group !== undefined) {
    checked = group === value
  }

  $: classes = [
    'radio',
    checked && 'radio_checked',
    disabled && 'radio_disabled',
    focusVisible && 'radio_focus-visible',
    className
  ]
    .filter(Boolean)
    .join(' ')

  $: uncontrolled = name && group === undefined && checked

  $: if (uncontrolled && typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('radio-check', { detail: { name, value } })
    )
  }

  function handleChange() {
    if (group !== undefined) {
      group = value
    } else {
      checked = true
    }
  }

  function onRadioCheck({ detail }) {
    if (name === detail.name && value !== detail.value) {
      checked = false
    }
  }
</script>

<svelte:window on:radio-check={uncontrolled && onRadioCheck} />

<label class={classes} {style}>
  <input
    class="radio__input"
    type="radio"
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
  <span class="radio__base">
    <slot name="base" {checked} {disabled}>
      <span class="radio__box" />
    </slot>
  </span>
  {#if $$slots.default || label}
    <span class="radio__label">
      <slot {disabled}>{label}</slot>
    </span>
  {/if}
</label>

<style lang="postcss" global>
  .radio {
    --radio-size: 20px;
    --radio-unchecked-color: #666666;
    --radio-checked-color: var(--color-primary, darkcyan);
    --radio-disabled-color: #bdbdbd;
    --radio-dot-size: 8px;
    --radio-label-line-height: var(--line-height, 1.5);
    --radio-label-offset: calc(
      (var(--radio-label-line-height) * 1em - var(--radio-size)) / -2
    );

    display: flex;
    align-items: flex-start;
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
      flex: 0 0 auto;
      font-size: var(--radio-size);
      color: var(--radio-unchecked-color);
      border-radius: 50%;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        width: 30px;
        height: 30px;
        min-width: 100%;
        min-height: 100%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: inherit;
      }
    }
    &_checked &__base {
      color: var(--radio-checked-color);
    }
    &_disabled &__base {
      color: var(--radio-disabled-color);
    }
    &_focus-visible &__base {
      @mixin focus-ring;
    }
    &__box {
      display: block;
      width: var(--radio-size);
      height: var(--radio-size);
      border: 1px solid currentColor;
      border-radius: inherit;
      position: relative;
    }
    &_checked &__box {
      &::before {
        content: '';
        position: absolute;
        width: var(--radio-dot-size);
        height: var(--radio-dot-size);
        border-radius: inherit;
        background-color: currentColor;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    &__label {
      display: inline-block;
      flex: 0 1 auto;
      margin-inline-start: 8px;
      line-height: var(--radio-label-line-height);
      margin-block-start: var(--radio-label-offset);
    }
    &_disabled &__label {
      opacity: 0.5;
    }
  }
</style>

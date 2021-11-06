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

  $: if (group !== undefined) {
    checked = group === value
  }

  $: classes = [
    'radio',
    variant && `radio_${variant}`,
    size && `radio_${size}`,
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
  $radio-size: 20px;
  $radio-color: hsl(214 17% 61%);
  $radio-active-color: var(--accent-color, var(--theme-color, darkcyan));
  $radio-disabled-color: hsl(218 10% 74%);
  $radio-dot-color: #ffffff;
  $radio-dot-disabled-color: var(--radio-dot-color, $radio-dot-color);
  $radio-label-line-height: 1.5;

  .radio {
    display: flex;
    align-items: flex-start;
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
      flex-shrink: 0;
      border-radius: 50%;
      position: relative;
      font-size: var(--radio-size, $radio-size);
      color: var(--radio-color, $radio-color);
      outline-color: transparent;

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

      svg {
        display: block;
        height: 1em;
        fill: currentColor;
        flex-shrink: 0;
      }
    }
    &_checked &__base {
      color: var(--radio-active-color, $radio-active-color);
    }
    &_disabled &__base {
      color: var(--radio-disabled-color, $radio-disabled-color);
    }
    &_focus-visible &__base {
      @mixin focus-ring;
    }
    &__box {
      width: var(--radio-size, $radio-size);
      height: var(--radio-size, $radio-size);
      border: 1px solid var(--radio-color, $radio-color);
      border-radius: inherit;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--radio-dot-color, $radio-dot-color);
      font-size: 8px;
    }
    &_checked &__box {
      background-color: var(--radio-active-color, $radio-active-color);
      border-color: var(--radio-active-color, $radio-active-color);
      border-width: 0;

      &::before {
        content: '';
        display: block;
        width: 1em;
        height: 1em;
        border-radius: inherit;
        background-color: currentColor;
        flex-shrink: 0;
      }
    }
    &_disabled &__box {
      border-color: var(--radio-disabled-color, $radio-disabled-color);
      color: var(--radio-dot-disabled-color, $radio-dot-disabled-color);
    }
    &_disabled&_checked &__box {
      background-color: var(--radio-disabled-color, $radio-disabled-color);
    }
    &__label {
      display: inline-block;
      flex: 0 1 auto;
      margin-inline-start: 8px;
      line-height: var(--radio-label-line-height, $radio-label-line-height);
      margin-top: calc(
        (
            var(--radio-label-line-height, $radio-label-line-height) * 1em -
              var(--radio-size, $radio-size)
          ) / -2
      );
    }
    &_disabled &__label {
      opacity: 0.6;
    }
  }
</style>

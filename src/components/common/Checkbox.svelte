<svelte:options immutable />

<script>
  import { focusVisibleAction } from '@/actions'

  let className = ''
  export { className as class }
  export let style = ''
  export let value = ''
  export let checked = false
  export let disabled = false
  export let indeterminate = false
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
    'checkbox',
    checked && !indeterminate && 'checkbox_checked',
    disabled && 'checkbox_disabled',
    indeterminate && 'checkbox_indeterminate',
    focusVisible && 'checkbox_focus-visible',
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
    class="checkbox__input"
    type="checkbox"
    {id}
    {checked}
    {value}
    {disabled}
    {name}
    bind:indeterminate
    {...$$restProps}
    bind:this={inputEl}
    use:focusVisibleAction={(v) => (focusVisible = v)}
    on:change={handleChange}
    on:change
  />
  <span class="checkbox__base">
    <slot name="base" {checked} {disabled}>
      <span class="checkbox__box">
        {#if checked || indeterminate}
          <span class="checkbox__icon" aria-hidden="true">
            {#if checked && !indeterminate}
              <slot name="checked-icon">
                <svg viewBox="0 0 14 10.59">
                  <path d="m5 10.42-5-5L1.41 4 5 7.59 12.59 0 14 1.42Z" />
                </svg>
              </slot>
            {/if}
            {#if indeterminate}
              <slot name="indeterminate-icon">
                <svg viewBox="0 0 10 2">
                  <path d="M0 0h10v2H0z" />
                </svg>
              </slot>
            {/if}
          </span>
        {/if}
      </span>
    </slot>
  </span>
  {#if $$slots.default || label}
    <span class="checkbox__label">
      <slot {disabled}>{label}</slot>
    </span>
  {/if}
</label>

<style lang="postcss" global>
  .checkbox {
    --checkbox-size: 18px;
    --checkbox-unchecked-color: #666666;
    --checkbox-checked-color: var(--color-primary, darkcyan);
    --checkbox-disabled-color: #bdbdbd;
    --checkbox-label-line-height: var(--line-height, 1.5);
    --checkbox-label-offset: calc(
      (var(--checkbox-label-line-height) * 1em - var(--checkbox-size)) / -2
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
      font-size: var(--checkbox-size);
      color: var(--checkbox-unchecked-color);
      border-radius: 2px;
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
    &_checked &__base,
    &_indeterminate &__base {
      color: var(--checkbox-checked-color);
    }
    &_disabled &__base {
      color: var(--checkbox-disabled-color);
    }
    &_focus-visible &__base {
      @mixin focus-ring;
    }
    &__box {
      display: block;
      width: var(--checkbox-size);
      height: var(--checkbox-size);
      border: 1px solid currentColor;
      border-radius: inherit;
      position: relative;
    }
    &_checked &__box,
    &_indeterminate &__box {
      background-color: currentColor;
    }
    &__icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #ffffff;

      svg {
        display: block;
        height: 1em;
        fill: currentColor;
      }
    }
    &_checked &__icon {
      font-size: 10px;
    }
    &_indeterminate &__icon {
      font-size: 2px;
    }
    &__label {
      display: inline-block;
      flex: 0 1 auto;
      margin-inline-start: 8px;
      line-height: var(--checkbox-label-line-height);
      margin-block-start: var(--checkbox-label-offset);
    }
    &_disabled &__label {
      opacity: 0.5;
    }
  }
</style>

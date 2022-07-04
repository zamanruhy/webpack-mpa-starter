<svelte:options immutable />

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
  export let indeterminate = false
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
    'checkbox',
    variant && `checkbox_${variant}`,
    size && `checkbox_${size}`,
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
    use:eventsAction={component}
    use:focusVisibleAction={(v) => (focusVisible = v)}
    on:change={handleChange}
  />
  <span class="checkbox__base">
    <slot name="base" {checked} {indeterminate} {disabled}>
      <span class="checkbox__box" aria-hidden="true">
        {#if indeterminate}
          <slot name="indeterminate-icon">
            <svg viewBox="0 0 16 16">
              <path d="M3 7h10v2H3z" />
            </svg>
          </slot>
        {:else if checked}
          <slot name="checked-icon">
            <svg viewBox="0 0 16 16">
              <path d="M6 13 1 8l1.41-1.41L6 10.17l7.59-7.59L15 4Z" />
            </svg>
          </slot>
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
  $checkbox-size: 18px;
  /* $checkbox-color: hsl(214 17% 61%);
  $checkbox-active-color: var(--accent-color, var(--color-theme, darkcyan));
  $checkbox-disabled-color: hsl(218 10% 74%);
  $checkbox-icon-color: #ffffff;
  $checkbox-icon-disabled-color: var(
    --checkbox-icon-color,
    $checkbox-icon-color
  ); */
  /* $checkbox-label-line-height: 1.5; */
  $checkbox-transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);

  .checkbox {
    display: flex;
    /* align-items: flex-start; */
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
    }

    &__input {
      @mixin visually-hidden;
    }
    &__base {
      flex-shrink: 0;
      border-radius: 2px;
      position: relative;
      font-size: var(--checkbox-size, $checkbox-size);
      /* color: var(--checkbox-color, $checkbox-color); */
      color: hsl(214 17% 61%);
      outline-color: transparent;
      transition: var(--checkbox-transition, $checkbox-transition);
      transition-property: outline-color, box-shadow;

      &::before {
        content: '';
        position: absolute;
        width: max(40px, 100%);
        height: max(40px, 100%);
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
    &_checked &__base,
    &_indeterminate &__base {
      /* color: var(--checkbox-active-color, $checkbox-active-color); */
      color: var(--accent-color, var(--color-theme, darkcyan));
    }
    &_disabled &__base {
      /* color: var(--checkbox-disabled-color, $checkbox-disabled-color); */
      color: hsl(218 10% 74%);
    }
    &_focus-visible &__base {
      /* @mixin focus-ring; */
      box-shadow: 0 0 0 3px hsl(207 73% 57% / 60%);
    }
    &__box {
      width: var(--checkbox-size, $checkbox-size);
      height: var(--checkbox-size, $checkbox-size);
      /* border: 1px solid var(--checkbox-color, $checkbox-color); */
      border: 1px solid currentColor;
      border-radius: inherit;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      /* color: var(--checkbox-icon-color, $checkbox-icon-color); */
      font-size: 16px;

      svg {
        color: #ffffff;
      }
    }
    &_checked &__box,
    &_indeterminate &__box {
      /* background-color: var(--checkbox-active-color, $checkbox-active-color);
      border-color: var(--checkbox-active-color, $checkbox-active-color); */
      border-width: 0;
      background-color: currentColor;
    }
    &_disabled &__box {
      /* border-color: var(--checkbox-disabled-color, $checkbox-disabled-color);
      color: var(--checkbox-icon-disabled-color, $checkbox-icon-disabled-color); */
    }
    &_disabled&_checked &__box,
    &_disabled&_indeterminate &__box {
      /* background-color: var(
        --checkbox-disabled-color,
        $checkbox-disabled-color
      ); */
    }
    &__label {
      display: inline-block;
      flex: 0 1 auto;
      margin-inline-start: 8px;
      /* line-height: var(
        --checkbox-label-line-height,
        $checkbox-label-line-height
      );
      margin-top: calc(
        (
            var(--checkbox-label-line-height, $checkbox-label-line-height) * 1em -
              var(--checkbox-size, $checkbox-size)
          ) / -2
      ); */
    }
    &_disabled &__label {
      opacity: 0.6;
    }
  }
</style>

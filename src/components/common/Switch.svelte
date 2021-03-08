<script>
  import { uid } from '@/utils'

  let className = ''
  export { className as class }
  export let value = ''
  export let checked = false
  export let group = undefined
  export let label = ''
  export let id = ''

  let inputEl

  $: if (Array.isArray(group)) {
    checked = group.includes(value)
  }
  $: cid = id || `switch-${uid()}`

  function handleChange(on) {
    if (Array.isArray(group)) {
      if (on && !group.includes(value)) {
        group.push(value)
        group = group
      } else if (!on && group.includes(value)) {
        group.splice(group.indexOf(value), 1)
        group = group
      }
    } else {
      checked = on
    }
  }

  function onClick() {
    inputEl.click()
    inputEl.focus()
  }
</script>

<div class="switch {className}">
  <input
    class="switch__control"
    id={cid}
    type="checkbox"
    {checked}
    {value}
    {...$$restProps}
    bind:this={inputEl}
    on:change={(e) => handleChange(e.target.checked)}
    on:change
  />
  <div class="switch__box" on:click={onClick} />
  {#if label}<label class="switch__label" for={cid}>{label}</label>{/if}
</div>

<style lang="scss" global>
  $switch-width: 40px;
  $switch-height: 20px;
  $switch-space: 2px;
  $switch-size: $switch-height - $switch-space * 2;
  $switch-translate: $switch-width - $switch-space * 2 - $switch-size;
  $switch-transition: 0.15s map-get($easings, fast-out-slow-in);

  .switch {
    display: inline-flex;
    align-items: center;
    vertical-align: middle;
    user-select: none;

    &__control {
      @include visually-hidden();
    }
    &__box {
      position: relative;
      background-color: #ccc;
      border-radius: $switch-height;
      height: $switch-height;
      width: $switch-width;
      cursor: pointer;

      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: inherit;
        background-color: $primary;
        opacity: 0;
        transition: opacity $switch-transition;
        will-change: opacity;
      }

      &:after {
        content: '';
        position: absolute;
        top: $switch-space;
        left: $switch-space;
        width: $switch-size;
        height: $switch-size;
        background-color: #ffffff;
        border-radius: 50%;
        transition: transform $switch-transition;
        will-change: transform;
      }
    }
    &__control:focus ~ &__box {
      @include focus-ring();
    }
    &__control:not(:focus-visible) ~ &__box {
      outline: 0;
    }
    &__control:checked ~ &__box {
      &:before {
        opacity: 1;
      }

      &:after {
        transform: translateX($switch-translate);
      }
    }
    &__control:disabled ~ &__box {
      opacity: 0.6;
      pointer-events: none;
    }
    &__label {
      display: inline-block;
      flex: 0 1 auto;
      margin-left: 8px;
    }
    &__control:disabled ~ &__label {
      color: #6c757d;
    }
  }

  app-switch:defined {
    display: inline-flex;
    vertical-align: middle;
  }

  // app-switch:not(:defined) {
  //   @extend .switch;

  //   &:before {
  //     content: '';
  //     height: $switch-height;
  //     width: $switch-width;
  //   }
  //   &[label]:after {
  //     @extend .switch__label;
  //     content: attr(label);
  //   }
  // }
</style>

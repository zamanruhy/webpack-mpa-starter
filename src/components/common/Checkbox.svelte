<script>
  let className = ''
  export { className as class }
  export let style = ''
  export let value = ''
  export let checked = false
  export let indeterminate = false
  export let group = undefined
  export let label = ''
  export let id = undefined

  $: if (Array.isArray(group)) {
    checked = group.includes(value)
  }

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
</script>

<label class="checkbox {className}" class:checkbox_single={!label} {style}>
  <input
    class="checkbox__control"
    type="checkbox"
    {id}
    {checked}
    {value}
    bind:indeterminate
    {...$$restProps}
    on:change={(e) => handleChange(e.target.checked)}
    on:change
  />
  <span class="checkbox__box" />
  {#if label}
    <span class="checkbox__label">{label}</span>
  {/if}
</label>

<style lang="scss" global>
  .checkbox {
    display: inline-flex;
    align-items: flex-start;
    vertical-align: middle;
    user-select: none;

    &__control {
      @include visually-hidden();
    }
    &__box {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex: 0 0 auto;
      width: 16px;
      height: 16px;
      border: 1px solid #adb5bd;
      border-radius: 2px;
      background-color: #ffffff;
      position: relative;
      top: 4px;
    }
    &__control:focus-visible ~ &__box {
      @include focus-ring();
    }
    &__control:checked ~ &__box {
      &:before {
        content: '';
        display: block;
        width: 6px;
        height: 6px;
        border-radius: 1px;
        background-color: #666666;
      }
    }
    &__control:indeterminate ~ &__box {
      &:before {
        content: '';
        display: block;
        position: absolute;
        width: 8px;
        height: 2px;
        border-radius: 1px;
        background-color: #666666;
      }
    }
    &__control:disabled ~ &__box {
      background-color: #e9ecef;

      &:before {
        background-color: rgba(0, 0, 0, 0.26);
      }
    }
    &_single &__box {
      top: 0;
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

  app-checkbox:defined {
    display: contents;
  }

  app-checkbox:not(:defined) {
    @extend .checkbox;

    &:before {
      @extend .checkbox__box;
      content: '';
    }
    &:not([label]):before {
      top: 0;
    }
    &[label]:after {
      @extend .checkbox__label;
      content: attr(label);
    }
  }
</style>

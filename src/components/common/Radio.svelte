<script>
  let className = ''
  export { className as class }
  export let style = ''
  export let value = ''
  export let checked = false
  export let group = undefined
  export let label = ''
  export let id = undefined

  $: if (group !== undefined) {
    checked = group === value
  }

  function handleChange(on) {
    if (group !== undefined) {
      group = value
    } else {
      checked = on
    }
  }
</script>

<label class="radio {className}" class:radio_single={!label} {style}>
  <input
    class="radio__control"
    type="radio"
    {id}
    {checked}
    {value}
    {...$$restProps}
    on:change={(e) => handleChange(e.target.checked)}
    on:change
  />
  <span class="radio__box" />
  {#if label}
    <span class="radio__label">{label}</span>
  {/if}
</label>

<style lang="scss" global>
  .radio {
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
      border-radius: 50%;
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
        border-radius: 50%;
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

  app-radio:defined {
    display: contents;
  }

  app-radio:not(:defined) {
    @extend .radio;

    &:before {
      @extend .radio__box;
      content: '';
    }
    &:not([label]):before {
      top: 0;
    }
    &[label]:after {
      @extend .radio__label;
      content: attr(label);
    }
  }
</style>

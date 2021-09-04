<script>
  let className = ''
  export { className as class }
  export let style = ''
  export let value = ''
  export let checked = false
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

<label class="switch {className}" {style}>
  <input
    class="switch__control"
    type="checkbox"
    {id}
    {checked}
    {value}
    role="switch"
    {...$$restProps}
    on:change={(e) => handleChange(e.target.checked)}
    on:change
  />
  <span class="switch__box" />
  {#if label}
    <span class="switch__label">{label}</span>
  {/if}
</label>

<style lang="postcss" global>
  .switch {
    --switch-width: 40px;
    --switch-height: 20px;
    --switch-size: 16px;
    --switch-space: calc((var(--switch-height) - var(--switch-size)) / 2);
    --switch-translate: calc(
      var(--switch-width) - var(--switch-space) * 2 - var(--switch-size)
    );
    --switch-transition: 0.15s var(--fast-out-slow-in);

    display: inline-flex;
    align-items: center;
    vertical-align: middle;
    user-select: none;
    cursor: pointer;

    &__control {
      @mixin visually-hidden;
    }
    &__box {
      display: inline-block;
      position: relative;
      background-color: #cccccc;
      border-radius: var(--switch-height);
      height: var(--switch-height);
      width: var(--switch-width);
      transition: background-color var(--switch-transition);

      &:after {
        content: '';
        position: absolute;
        top: var(--switch-space);
        left: var(--switch-space);
        width: var(--switch-size);
        height: var(--switch-size);
        background-color: #ffffff;
        border-radius: 50%;
        transition: transform var(--switch-transition);
      }
    }
    &__control:focus-visible ~ &__box {
      @mixin focus-ring;
    }
    &__control:checked ~ &__box {
      background-color: $color-primary;

      &:after {
        transform: translateX(var(--switch-translate));
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
</style>

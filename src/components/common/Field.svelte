<script>
  export let label = ''
  export let labelFor = undefined
  export let hint = ''
  export let error = ''

  $: classes = ['field', error && 'field_error'].filter(Boolean).join(' ')
  $: text = error || hint
</script>

<div class={classes}>
  {#if labelFor}
    <label class="field__label" for={labelFor}>{label}</label>
  {:else}
    <div class="field__label">{label}</div>
  {/if}
  <div class="field__content">
    <slot />
    {#if text}
      <div class="field__text">{text}</div>
    {/if}
  </div>
</div>

<style lang="scss" global>
  .field {
    &__label {
      display: inline-block;
      margin-bottom: 8px;
    }
    &__content {
    }
    &__text {
      margin-top: 4px;
      color: #6c757d;
      font-size: 80%;
    }
    &_error &__text {
      color: #dc3545;
    }
  }
</style>

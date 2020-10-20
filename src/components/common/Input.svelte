<script>
  import { onMount } from 'svelte'
  import { uid } from '@/utils'

  let className = ''
  export { className as class }
  export let id = ''
  export let value = ''
  export let label = ''
  export let type = 'text'
  export let autofocus = false

  let inputEl

  $: if (
    !['email', 'number', 'password', 'search', 'tel', 'text', 'url'].includes(
      type
    )
  ) {
    type = 'text'
  }
  $: cid = id || `input-${uid()}`
  $: classes = ['input', className].filter((c) => c).join(' ')

  function onInput(e) {
    value = type === 'number' ? +e.target.value : e.target.value
  }

  onMount(() => {
    if (autofocus) {
      inputEl.focus()
    }
  })
</script>

<div class={classes}>
  {#if label}<label class="input__label" for={cid}>{label}</label>{/if}
  <div class="input__field">
    <input
      class="input__control"
      id={cid}
      {type}
      {value}
      {...$$restProps}
      bind:this={inputEl}
      on:input={onInput}
      on:input
      on:click
    />
  </div>
</div>

<style lang="scss" global>
  .input {
    &__label {
      margin-bottom: 8px;
      display: inline-block;
    }
    &__field {
    }
    &__control {
      width: 100%;
      border: 1px solid #ced4da;
      color: #495057;
      border-radius: 2px;
      padding: 6px 12px;
      height: calc(1.5em + #{6px * 2} + 2px);
      background-color: #ffffff;

      &:focus {
        outline: 0;
        border-color: #e59700;
        box-shadow: 0 0 0 3px rgba(#e59700, 0.35);
      }

      &::placeholder {
        color: #6c757d;
        opacity: 1;
      }
    }
  }

  app-input:defined {
    display: block;
  }

  app-input:not(:defined) {
    display: block;

    &[label]:before {
      @extend .input__label;
      content: attr(label);
    }
    &:after {
      @extend .input__control;
      content: '';
      display: block;
    }
  }

  app-file-input:not(:defined) {
    &:before {
      @extend .input__control;
    }
  }
</style>

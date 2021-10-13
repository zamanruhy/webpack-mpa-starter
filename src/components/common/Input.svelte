<script>
  import { onMount } from 'svelte'

  let className = ''
  export { className as class }
  export let style = ''
  export let id = undefined
  export let value = ''
  export let type = 'text'
  export let autofocus = false
  export let inputEl = undefined

  $: if (
    !['email', 'number', 'password', 'search', 'tel', 'text', 'url'].includes(
      type
    )
  ) {
    type = 'text'
  }
  $: classes = ['input', className].filter(Boolean).join(' ')

  function onInput(e) {
    value = type === 'number' ? +e.target.value : e.target.value
  }

  onMount(() => {
    if (autofocus) {
      inputEl.focus()
    }
  })
</script>

<div class={classes} {style}>
  <input
    class="input__input"
    {id}
    {type}
    {value}
    {...$$restProps}
    bind:this={inputEl}
    on:input={onInput}
    on:input
    on:change
    on:click
  />
</div>

<style lang="postcss" global>
  .input {
    &__input {
      width: 100%;
      border: 1px solid #ced4da;
      color: #495057;
      border-radius: 2px;
      padding: 6px 12px;
      height: calc(1.5em + 6px * 2 + 2px);
      background-color: #ffffff;

      &:focus {
        @mixin focus-ring 2px, -1px;
      }

      &::placeholder {
        color: #6c757d;
        opacity: 1;
      }
    }
  }
</style>

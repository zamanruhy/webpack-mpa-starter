<script>
  import { createEventDispatcher } from 'svelte'
  import Input from './Input.svelte'
  import Button from './Button.svelte'

  export let id = undefined
  export let value = null

  let controlEl
  const dispatch = createEventDispatcher()

  $: fileName = value ? value.name : ''
  $: dispatch('update', value)

  function onClick() {
    controlEl.click()
  }
  function onFileSelect(e) {
    value = e.target.files[0]
  }
</script>

<div class="file-input">
  <input
    class="file-input__control"
    {id}
    type="file"
    name="image"
    accept="image/*"
    bind:this={controlEl}
    on:change={onFileSelect}
  />
  <div class="file-input__field">
    <Input
      class="file-input__input"
      value={fileName}
      tabindex="-1"
      readonly
      placeholder="No file chosen"
      aria-hidden="true"
      on:click={onClick}
    />
    <Button
      variant="primary"
      class="file-input__button"
      tabindex="-1"
      aria-hidden="true"
      on:click={onClick}
    >
      Browse
    </Button>
  </div>
</div>

<style lang="postcss" global>
  .file-input {
    &__control {
      @mixin visually-hidden;
    }
    &__control:focus + &__field .input__control {
      @mixin focus-ring 2px, -1px;
    }
    &__field {
      position: relative;
      display: flex;
      align-items: center;
    }
    &__input {
      flex: 1 1 auto;
    }
    &__button {
      flex: 0 0 auto;
      margin-left: 5px;
    }
  }
</style>

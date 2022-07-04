<script>
  import { onMount } from 'svelte'
  import { get_current_component } from 'svelte/internal'
  import { eventsAction } from '@/actions'

  let className = ''
  export { className as class }
  export let style = ''
  export let id = undefined
  export let value = ''
  export let type = 'text'
  export let autofocus = false
  export let action = () => {}
  export let inputEl = undefined

  const component = get_current_component()

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
    autofocus && inputEl.focus()
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
    use:action
    use:eventsAction={component}
    on:input={onInput}
  />
</div>

<style lang="postcss" global>
  .input {
    &__input {
      all: unset;
      box-sizing: border-box;
      width: 100%;
      border: 1px solid hsl(211 25% 84%);
      border-radius: 4px;
      padding: 0 16px;
      /* height: calc(1.5em + 6px * 2 + 2px); */
      height: 40px;
      background-color: transparent;
      position: relative;
      transition: 200ms cubic-bezier(0.4, 0, 0.2, 1);
      transition-property: transform, background-color, color, border-color,
        outline-color, box-shadow;

      &:focus {
        /* @mixin focus-ring 2px, 2px; */
        border-color: var(--accent-color, var(--color-theme, darkcyan));
        box-shadow: 0 0 0 1px var(--accent-color, var(--color-theme, darkcyan));
      }

      &::placeholder {
        color: hsl(214 20% 69%);
        opacity: 1;
      }

      &[type='search'] {
        &::-webkit-search-decoration,
        &::-webkit-search-cancel-button,
        &::-webkit-search-results-button,
        &::-webkit-search-results-decoration {
          display: none;
        }
      }
    }
  }
</style>

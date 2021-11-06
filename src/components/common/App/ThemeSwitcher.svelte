<script>
  import { onMount } from 'svelte'
  import Switch from '@/components/common/Switch.svelte'

  export let theme

  let prefersDark = false
  let forcedTheme = null
  let mounted = false
  let themeColorEl
  let colorSchemeEl

  $: theme = forcedTheme || (prefersDark ? 'dark' : 'light')

  $: if (mounted) {
    forcedTheme
      ? window.localStorage.setItem('theme', forcedTheme)
      : window.localStorage.removeItem('theme')
    document.documentElement.setAttribute('data-theme', theme)
    themeColorEl.content =
      theme === 'dark' ? 'hsl(174 57% 52%)' : 'hsl(179 51% 39%)'
    colorSchemeEl.content = theme
  }

  function onChange(e) {
    const { checked } = e.target
    if (checked !== prefersDark) {
      forcedTheme = checked ? 'dark' : 'light'
    } else {
      forcedTheme = null
    }
  }

  onMount(() => {
    mounted = true

    themeColorEl = document.querySelector('meta[name="theme-color"]')
    colorSchemeEl = document.querySelector('meta[name="color-scheme"]')
    forcedTheme = window.localStorage.getItem('theme')

    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    prefersDark = mql.matches
    mql.onchange = () => (prefersDark = mql.matches)
  })
</script>

<Switch
  class="theme-switcher"
  {...$$restProps}
  checked={theme === 'dark'}
  on:change={onChange}
>
  Enable
  <span class="theme-switcher__word-wrap">
    <span class="theme-switcher__word">dark</span>
    <span class="theme-switcher__word">light</span>
  </span>
  theme
  <svelte:fragment slot="thumb">
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"
      />
    </svg>
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"
      />
    </svg>
  </svelte:fragment>
</Switch>

<style lang="postcss" global>
  .theme-switcher {
    &.switch {
      --switch-width: 48px;
      --switch-height: 20px;
      --switch-thumb-size: 32px;
      --switch-thumb-left: -1px;
      --switch-color: hsl(210 13% 71%);
      --switch-active-color: var(--switch-color);
      --switch-thumb-color: #001e3c;
      --ripple-opacity: 0.4;

      [data-theme='dark'] & {
        --switch-color: #8796a5;
        --switch-thumb-color: #003892;
        --ripple-opacity: 0.3;
      }

      .switch__base {
        outline: 0;
      }
      .switch__thumb {
        color: #ffffff;
        font-size: 20px;
        box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
          0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);

        /* the following is to display the state correctly on the first page render but before js bundle is load */
        transform: translateX(
          calc(
            (
                var(--switch-width) - var(--switch-thumb-left) * 2 -
                  var(--switch-thumb-size)
              ) * var(--dark-theme)
          )
        );
        display: grid;

        svg {
          grid-area: 1 / -1;
          transition: inherit;
          transition-property: opacity;

          &:first-child {
            opacity: var(--dark-theme);
          }
          &:last-child {
            opacity: calc(1 - var(--dark-theme));
          }
        }
      }
      &_focus-visible .switch__thumb::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 50%;
        left: 50%;
        border-radius: inherit;
        background-color: #ffffff;
        animation: ripple-check 200ms var(--ease-out) forwards;
      }
      &_focus-visible&_checked .switch__thumb::before {
        animation: ripple-checked 200ms var(--ease-out) forwards;
      }
    }
    &__word-wrap {
      display: inline-grid;
    }
    &__word {
      grid-area: 1 / -1;

      &:first-child {
        opacity: calc(1 - var(--dark-theme));
        width: calc(1 - var(--dark-theme));
      }
      &:last-child {
        opacity: var(--dark-theme);
        width: var(--dark-theme);
      }
    }
  }
</style>

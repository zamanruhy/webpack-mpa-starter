<script context="module">
  export const TABS = {}
</script>

<script>
  import { setContext, onMount, onDestroy, createEventDispatcher } from 'svelte'
  import { writable } from 'svelte/store'
  import { uid } from '@/utils'

  let className = ''
  export { className as class }
  export let variant = ''
  export let index = 0
  export let vertical = false
  export let rtl = false

  let tabs = []
  let panels = []
  let activeTab = writable(null)
  let activePanel = writable(null)
  let firstUpdate = true
  let mounted = false
  const dispatch = createEventDispatcher()
  const counter = { tab: 1, panel: 1 }
  const cid = uid()
  const context = {
    registerTab(tab) {
      tabs.push(tab)

      if (tabs.indexOf(tab) === index) {
        activeTab.set(tab)
      }

      onDestroy(() => {
        const i = tabs.indexOf(tab)
        tabs.splice(i, 1)

        if ($activeTab === tab) {
          activeTab.set(tabs[i] || tabs[tabs.length - 1])
        }
      })

      return `tab-${cid}-${counter.tab++}`
    },
    registerPanel(panel) {
      panels.push(panel)

      if (panels.indexOf(panel) === index) {
        activePanel.set(panel)
      }

      onDestroy(() => {
        const i = panels.indexOf(panel)
        panels.splice(i, 1)
      })

      return `tab-${cid}-${counter.panel++}`
    },
    activeTab,
    activePanel,
    onTabKeydown
  }

  $: activePanel.set(panels[index])
  $: activeTab.set(tabs[index])
  $: if ($activeTab) {
    index = tabs.indexOf($activeTab)
  }
  $: dispatch('update', index)
  $: if (mounted && $activeTab) {
    if (firstUpdate) {
      firstUpdate = false
    } else {
      focusActiveTab()
    }
  }
  $: classes = [
    'tabs',
    vertical && 'tabs_vertical',
    variant && `tabs_${variant}`,
    className
  ]
    .filter(Boolean)
    .join(' ')

  function focusActiveTab() {
    const activeTabEl = $activeTab.el
    const listEl = activeTabEl.closest('.tabs__list')
    const scrollLeft = listEl.scrollLeft
    activeTabEl.focus({ preventScroll: true })
    listEl.scrollLeft = scrollLeft
  }
  function onTabKeydown(e, tab) {
    const key = e.key
    const i = tabs.indexOf(tab)
    const lessArrows = [vertical ? 'ArrowUp' : rtl ? 'ArrowRight' : 'ArrowLeft']
    const moreArrows = [
      vertical ? 'ArrowDown' : rtl ? 'ArrowLeft' : 'ArrowRight'
    ]

    if (key === ' ') {
      e.preventDefault()
      index = i
    } else if (lessArrows.includes(key)) {
      e.preventDefault()
      index = Math.max(index - 1, 0)
    } else if (moreArrows.includes(key)) {
      e.preventDefault()
      index = Math.min(index + 1, tabs.length - 1)
    } else if (key === 'Home') {
      e.preventDefault()
      index = 0
    } else if (key === 'End') {
      e.preventDefault()
      index = tabs.length - 1
    }
  }

  setContext(TABS, context)

  onMount(() => {
    mounted = true
  })
</script>

<div class={classes} {...$$restProps}>
  <slot />
</div>

<style lang="postcss" global>
  .tabs {
    &_vertical {
      display: flex;
    }
    &__list {
      display: flex;
      flex-wrap: wrap;
    }
    &_vertical &__list {
      flex-direction: column;
      flex-shrink: 0;
    }
    &__tab {
      font: inherit;
      color: inherit;
      appearance: none;
      background-color: transparent;
      text-transform: none;
      outline: 0;
      box-sizing: border-box;
      cursor: pointer;
      flex: 0 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 8px 16px;
      border: 0 solid hsl(214 32% 91%);
      border-bottom-width: 2px;
      white-space: nowrap;
      transition: 200ms cubic-bezier(0.4, 0, 0.2, 1);
      transition-property: transform, opacity, background-color, color,
        border-color, outline, box-shadow;

      &_focus-visible {
        box-shadow: 0 0 0 3px hsl(207 73% 57% / 60%);
      }
      &_active {
        color: var(--color-theme, darkcyan);
        border-color: currentColor;
        z-index: 1;
      }
    }
    &_vertical &__tab {
      border-bottom-width: 0;
      border-inline-start-width: 2px;
    }
    &__panel {
      box-sizing: border-box;
      width: 100%;
      padding: 16px;
      display: none;

      &_active {
        display: block;
      }
    }
    &_vertical &__panel {
      flex-grow: 1;
      min-width: 0;
    }
  }
</style>

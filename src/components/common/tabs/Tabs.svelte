<script context="module">
  export const TABS = {}
</script>

<script>
  import { setContext, onMount, onDestroy, createEventDispatcher } from 'svelte'
  import { writable } from 'svelte/store'
  import { uid } from '@/utils'

  export let index = 0

  let tabs = []
  let panels = []
  let activeTab = writable(null)
  let activePanel = writable(null)
  let firstUpdate = true
  let centerActive = true
  let mounted = false
  let scrollTimer
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
      scrollTimer = setTimeout(() => {
        scrollToActiveTab()
      }, 100)
    } else {
      focusActiveTab()
      scrollToActiveTab()
    }
  }

  function scrollToActiveTab() {
    const activeTabEl = $activeTab.el
    const listEl = activeTabEl.closest('.tabs__list')
    const isOverflowing = listEl.scrollWidth > listEl.offsetWidth
    if (!isOverflowing) {
      return
    }

    if (centerActive) {
      listEl.scrollLeft =
        activeTabEl.offsetLeft -
        listEl.offsetWidth / 2 +
        activeTabEl.offsetWidth / 2
      return
    }

    const offset = 10
    const tabEnd = activeTabEl.offsetLeft + activeTabEl.offsetWidth
    const listEnd = listEl.scrollLeft + listEl.offsetWidth
    const offsetEnd = tabEnd - listEnd
    if (offsetEnd > 0) {
      listEl.scrollLeft += offsetEnd + offset
      return
    }

    const tabStart = activeTabEl.offsetLeft
    const listStart = listEl.scrollLeft
    const offsetStart = listStart - tabStart
    if (offsetStart > 0) {
      listEl.scrollLeft -= offsetStart + offset
    }
  }
  function focusActiveTab() {
    const activeTabEl = $activeTab.el
    const listEl = activeTabEl.closest('.tabs__list')
    const scrollLeft = listEl.scrollLeft
    activeTabEl.focus()
    listEl.scrollLeft = scrollLeft
  }
  function onTabKeydown(e, tab) {
    const key = e.key
    const i = tabs.indexOf(tab)
    if (key === ' ') {
      e.preventDefault()
      index = i
    } else if (key === 'ArrowUp' || key === 'ArrowLeft') {
      e.preventDefault()
      index = Math.max(index - 1, 0)
    } else if (key === 'ArrowDown' || key === 'ArrowRight') {
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

  onDestroy(() => {
    clearTimeout(scrollTimer)
  })
</script>

<div class="tabs">
  <slot />
</div>

<style lang="postcss" global>
  $scrollbar-track-color: #ededee;
  $scrollbar-color: #ceced1;

  .tabs {
    &__list {
      display: flex;
      overflow: auto;
      margin-bottom: -1px;
      position: relative;
      scroll-behavior: smooth;
      scrollbar-width: thin;
      scrollbar-color: $scrollbar-color $scrollbar-track-color;

      @media (pointer: fine) {
        &::-webkit-scrollbar {
          width: 8px;
          height: 8px;
          background-color: $scrollbar-track-color;
        }
        &::-webkit-scrollbar-thumb {
          background-color: $scrollbar-color;

          &:hover {
            background-color: darken($scrollbar-color, 0.1);
          }
          &:active {
            background-color: darken($scrollbar-color, 0.2);
          }
        }
      }
    }
    &__tab {
      color: var(--color-primary);
      cursor: pointer;
      flex: 0 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 8px 16px;
      border: 1px solid transparent;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      white-space: nowrap;
      outline-offset: -3px !important;

      &_active {
        color: #495057;
        background-color: #fff;
        border-color: #dee2e6 #dee2e6 #ffffff;
      }

      &:hover {
        color: #495057;
      }
    }
    &__panel {
      width: 100%;
      padding: 16px;
      display: none;
      border-top: 1px solid #dee2e6;

      &_active {
        display: block;
      }
    }
  }
</style>

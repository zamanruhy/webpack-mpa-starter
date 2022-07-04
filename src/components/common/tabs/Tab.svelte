<script>
  import { getContext } from 'svelte'
  import { TABS } from './Tabs.svelte'
  import { focusVisibleAction } from '@/actions'

  let focusVisible = false
  const tab = {}
  const { registerTab, activeTab, onTabKeydown } = getContext(TABS)
  const id = registerTab(tab)
</script>

<button
  class="tabs__tab"
  class:tabs__tab_active={$activeTab === tab}
  class:tabs__tab_focus-visible={focusVisible}
  type="button"
  role="tab"
  aria-selected={$activeTab === tab}
  {id}
  tabindex={$activeTab !== tab ? -1 : null}
  bind:this={tab.el}
  use:focusVisibleAction={(v) => (focusVisible = v)}
  on:click|preventDefault={() => ($activeTab = tab)}
  on:keydown={(e) => onTabKeydown(e, tab)}
>
  <slot />
</button>

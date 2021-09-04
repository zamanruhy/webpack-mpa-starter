<script>
  import { getContext } from 'svelte'
  import { TABS } from './Tabs.svelte'

  const tab = {}
  const { registerTab, activeTab, onTabKeydown } = getContext(TABS)
  const id = registerTab(tab)
</script>

<a
  class="tabs__tab"
  class:tabs__tab_active={$activeTab === tab}
  href="/"
  role="tab"
  aria-selected={$activeTab === tab ? 'true' : 'false'}
  {id}
  tabindex={$activeTab !== tab ? '-1' : null}
  bind:this={tab.el}
  on:click|preventDefault={() => ($activeTab = tab)}
  on:keydown={(e) => onTabKeydown(e, tab)}
>
  <slot />
</a>

<script>
  import { getContext } from 'svelte'
  import { TABS } from './Tabs.svelte'

  const panel = {}
  const { registerPanel, activePanel } = getContext(TABS)
  const id = registerPanel(panel)
</script>

<div
  class="tabs__panel"
  class:tabs__panel_active={$activePanel === panel}
  role="tabpanel"
  aria-hidden={$activePanel !== panel}
  aria-labelledby={id}
>
  {#if $activePanel === panel}
    <slot />
  {/if}
</div>

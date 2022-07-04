<script>
  import Test from './Test.svelte'
  import Switch from '@/components/common/Switch.svelte'
  import Checkbox from '@/components/common/Checkbox.svelte'
  import Radio from '@/components/common/Radio.svelte'
  import Button from '@/components/common/Button.svelte'
  import Range from '@/components/common/Range.svelte'
  import { Tabs, TabList, Tab, TabPanel } from '@/components/common/tabs'
  import Spinner from '@/components/common/Spinner.svelte'
  import Dialog from '@/components/common/Dialog.svelte'
  import Drawer from '@/components/common/Drawer.svelte'
  import Collapse from '@/components/common/Collapse.svelte'
  import { collapseAction } from '@/actions'
  import Hamburger from '@/components/common/Hamburger.svelte'
  import Input from '@/components/common/Input.svelte'
  // import Field from '@/components/common/Field.svelte'

  import ThemeSwitcher from './ThemeSwitcher.svelte'

  let switchGroup = [2]
  let checkboxGroup = [2]
  let radioGroup = 2
  let rangeValue = [20, 62]
  let tabIndex = 0
  let drawerPlacement = 'left'
  let dialogOpen = false
  let drawerOpen = false
  const marks = [
    {
      value: 0,
      label: '0°C'
    },
    {
      value: 13,
      label: '13°C'
    },
    {
      value: 20
    },
    {
      value: 33,
      label: '33°C'
    },
    {
      value: 47
    },
    {
      value: 62,
      label: '62°C'
    },
    {
      value: 86,
      label: '86°C'
    },
    {
      value: 100,
      label: '100°C'
    }
  ]

  $: console.log(rangeValue)
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<ThemeSwitcher />

<hr />

<h5 class="-mt-px mb-4 text-indigo-500 dark:text-green-400">Input m-6</h5>
<Input
  type="search"
  placeholder="Typing..."
  on:input={(e) => console.log(e.target.value)}
  on:click={(e) => console.log(e.target)}
/>
<hr />

<h5
  class="text-30px z-modal z-fixed mt-10 min-w-min text-red-600 ease-in dark:text-red-400"
>
  Hamburger
</h5>
<Hamburger />

<hr />

<h5>Collapse</h5>
<Button
  action={(node) =>
    collapseAction(node, { id: 'collapse', class: 'collapsed-class' })}
>
  Toogle Collapse
</Button>
<Collapse id="collapse">
  <div style="padding-top: 16px">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet ab quos
    recusandae distinctio, quae esse ea minima sunt eligendi nam expedita!
    Debitis optio, explicabo aspernatur doloribus libero adipisci ducimus! Quo
    nostrum totam similique vero saepe, illo accusantium eos aspernatur
    voluptatem sapiente possimus repellendus ducimus suscipit ullam atque
    perferendis praesentium nemo a tempora nulla corrupti, quisquam alias?
    Architecto maxime ipsam nesciunt repudiandae vero, voluptate eum molestias
    quidem.
  </div>
</Collapse>

<hr />

<h5>Drawer</h5>
<Button variant="primary" on:click={() => (drawerOpen = !drawerOpen)}>
  Open Drawer
</Button>
<Drawer bind:open={drawerOpen} placement={drawerPlacement} let:close>
  <h5 class="mb-0" slot="header">Drawer title</h5>
  <div>
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero, laboriosam
    deleniti? Ipsum aliquid maiores placeat iure obcaecati, accusamus cum,
    dolores sunt optio, quis voluptate similique perspiciatis! Laudantium
    aspernatur asperiores impedit necessitatibus, ex nulla tenetur. Qui ea
    repellendus sint ex illo recusandae dolorem laboriosam, ipsa deleniti!
    Incidunt doloribus distinctio ullam error dignissimos ad magnam ipsam sed?
    Dolorum temporibus dicta consequatur commodi est, reiciendis sunt deserunt
    odio non quam sapiente obcaecati eaque aliquid necessitatibus facere, ab,
    ratione magnam animi modi?
  </div>
  <div class="mt-4 flex gap-4">
    <Radio bind:group={drawerPlacement} name="placement" value="left">
      Left
    </Radio>
    <Radio bind:group={drawerPlacement} name="placement" value="right">
      Right
    </Radio>
    <Radio bind:group={drawerPlacement} name="placement" value="top">Top</Radio>
    <Radio bind:group={drawerPlacement} name="placement" value="bottom">
      Bottom
    </Radio>
  </div>
  <Button variant="primary" slot="footer" on:click={close}>Close</Button>
</Drawer>

<hr />

<h5>Dialog</h5>
<Button on:click={() => (dialogOpen = !dialogOpen)}>Open Dialog</Button>
<Dialog
  bind:open={dialogOpen}
  aria-labelledby="dialog-title"
  aria-describedby="dialog-description"
  let:close
  scrollable
>
  <h5 id="dialog-title" class="mb-0" slot="header">Dialog title</h5>
  <div id="dialog-description">
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam nemo
    possimus dolorum ducimus rerum tempora aut repudiandae necessitatibus
    adipisci, voluptatem, esse est? Alias ad error magni culpa at consectetur
    architecto magnam, deserunt dolorem doloribus sequi reiciendis laudantium
    sint laboriosam, delectus cum rerum quam totam sit. Sint culpa facilis
    doloribus accusamus voluptate omnis unde iste corrupti, harum architecto
    soluta enim velit aut minus sequi magni laborum quisquam esse cumque
    sapiente laboriosam nisi et quasi saepe! Quibusdam perferendis quo illum
    architecto fuga. Eius provident architecto nostrum, incidunt alias quis
    totam saepe deleniti nam tempore quidem natus quibusdam accusamus velit
    maiores fugiat! Pariatur?
  </div>
  <svelte:fragment slot="footer">
    <Button variant="primary" on:click={close}>Close dialog</Button>
  </svelte:fragment>
</Dialog>

<!-- <Dialog bind:open={dialogOpen}>
  <div>
    <p class="mb-0">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam nemo
      possimus dolorum ducimus rerum tempora aut repudiandae necessitatibus
      adipisci, voluptatem, esse est? Alias ad error magni culpa at consectetur
      architecto magnam, deserunt dolorem doloribus sequi reiciendis laudantium
      sint laboriosam, delectus cum rerum quam totam sit.
    </p>
  </div>
</Dialog> -->

<hr />

<h5>Spinner</h5>
<Spinner size={32} width={2} />

<hr />

<h5>Tabs</h5>
<Tabs bind:index={tabIndex}>
  <TabList>
    {#each [...Array(7).keys()] as num (num)}
      <Tab>Tab {num + 1}</Tab>
    {/each}
  </TabList>
  {#each [...Array(7).keys()] as num (num)}
    <TabPanel>
      Content of Tab {num + 1}
    </TabPanel>
  {/each}
</Tabs>
<!-- <Tabs vertical>
  <TabList>
    {#each [...Array(4).keys()] as num (num)}
      <Tab>Tab {num + 1}</Tab>
    {/each}
  </TabList>
  {#each [...Array(4).keys()] as num (num)}
    <TabPanel>
      Content of Tab {num + 1}
    </TabPanel>
  {/each}
</Tabs> -->

<hr />

<h5>Range</h5>
<div class="grid gap-4">
  <Range
    bind:value={rangeValue}
    min={0}
    max={100}
    step={null}
    {marks}
    tooltipDisplay="auto"
  />
  <!-- {JSON.stringify(rangeValue)} -->
  <h5 class="mb-0">Chakra</h5>
  <Range
    class="chakra-range"
    value={[30, 60]}
    min={0}
    max={100}
    step={1}
    tooltipDisplay="never"
  />
  <h5 class="mb-0">Mui</h5>
  <Range class="mui-range" value={[30, 60]} {marks} tooltipDisplay="auto" />
  <h5 class="mb-0">iOS</h5>
  <Range
    class="ios-range"
    value={60}
    step={10}
    marks={true}
    aria-label="ios slider"
    tooltipDisplay="always"
  />
  <h5 class="mb-0">pretto.fr</h5>
  <Range class="pretto-range" value={20} aria-label="pretto slider" />
  <h5 class="mb-0">Airbnb</h5>
  <Range
    class="airbnb-range"
    value={[20, 40]}
    getAriaLabel={(i) => (i === 0 ? 'Minimum price' : 'Maximum price')}
    tooltipDisplay="never"
  >
    <div class="airbnb-range__thumb-bars" slot="thumb">
      <div class="airbnb-range__thumb-bar" />
      <div class="airbnb-range__thumb-bar" />
      <div class="airbnb-range__thumb-bar" />
    </div>
  </Range>
</div>

<hr />

<h5>Button</h5>
<div class="flex flex-wrap items-center gap-4">
  <Button>Default</Button>
  <Button loading>Loading</Button>
  <Button disabled>Disabled</Button>
  <Button class="mui-button" variant="contained">Mui Contained</Button>
  <Button class="mui-button" variant="outlined">
    <svg viewBox="0 0 24 24" style="font-size: 20px" aria-hidden="true">
      <path
        d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
      />
    </svg>
    Mui Outlined
  </Button>
  <Button class="chakra-button" variant="solid">
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="none" d="M0 0h24v24H0z" clip-rule="evenodd" />
      <path
        d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"
      />
    </svg>
    Chakra Solid
  </Button>
  <Button class="chakra-button" variant="outline">Chakra Outline</Button>
</div>

<hr />

<h5>Radio</h5>
<div class="flex flex-wrap items-center gap-4">
  <Radio label="Disable" name="radio-name" bind:group={radioGroup} value={1} />
  <Radio label="Default" name="radio-name" bind:group={radioGroup} value={2} />
  <Radio
    class="mui-radio"
    label="Mui"
    name="radio-styled-name"
    disabled={radioGroup === 1}
    checked
    value={1}
  >
    <svelte:fragment slot="base">
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <path
          d="M10 0a10 10 0 1 0 10 10A10 10 0 0 0 10 0Zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8Z"
        />
      </svg>
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <path d="M6.5 6.5a4.95 4.95 0 1 1 7 7 4.95 4.95 0 1 1-7-7z" />
      </svg>
    </svelte:fragment>
  </Radio>
  <Radio
    class="button-radio"
    name="radio-styled-name"
    disabled={radioGroup === 1}
    value={2}
  >
    <svelte:fragment slot="base">Button</svelte:fragment>
  </Radio>
  <Radio
    class="carbon-radio"
    label="Carbon"
    name="radio-styled-name"
    disabled={radioGroup === 1}
    value={3}
  />
</div>

<hr />

<h5>Checkbox</h5>
<div class="flex flex-wrap items-center gap-4">
  <Checkbox label="Disable" bind:group={checkboxGroup} value={1} />
  <Checkbox
    label="Default"
    disabled={checkboxGroup.includes(1)}
    bind:group={checkboxGroup}
    value={2}
  />
  <Checkbox
    class="mui-checkbox"
    label="Mui"
    disabled={checkboxGroup.includes(1)}
    bind:group={checkboxGroup}
    value={2}
  >
    <svg
      viewBox="0 0 18 18"
      aria-hidden="true"
      slot="base"
      let:checked
      let:indeterminate
    >
      {#if indeterminate}
        <path
          d="M16 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-2 10H4V8h10Z"
        />
      {:else if checked}
        <path
          d="M16 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM7 14 2 9l1.41-1.41L7 11.17l7.59-7.59L16 5Z"
        />
      {:else}
        <path
          d="M16 2v14H2V2h14m0-2H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Z"
        />
      {/if}
    </svg>
  </Checkbox>
  <Checkbox
    class="blueprint-checkbox"
    label="Blueprint"
    disabled={checkboxGroup.includes(1)}
    bind:group={checkboxGroup}
    value={2}
  >
    <svg viewBox="0 0 16 16" slot="checked-icon">
      <path
        d="M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z"
      />
    </svg>
    <svg viewBox="0 0 16 16" slot="indeterminate-icon">
      <path
        d="M11 7H5c-.55 0-1 .45-1 1s.45 1 1 1h6c.55 0 1-.45 1-1s-.45-1-1-1z"
      />
    </svg>
  </Checkbox>
  <Checkbox
    class="notify-checkbox"
    aria-label="Notify"
    disabled={checkboxGroup.includes(1)}
    bind:group={checkboxGroup}
    value={2}
  >
    <svg viewBox="0 0 24 24" aria-hidden="true" slot="base" let:checked>
      {#if checked}
        <path
          d="M21.5 8.99992H19.5V8.80992C19.5 6.89992 18.39 5.18991 16.6 4.32991L17.47 2.52991C19.96 3.71991 21.5 6.12992 21.5 8.80992V8.99992ZM4.5 8.80992C4.5 6.89992 5.61 5.18991 7.4 4.32991L6.53 2.52991C4.04 3.71991 2.5 6.12992 2.5 8.80992V8.99992H4.5V8.80992ZM12 21.9999C13.1 21.9999 14 21.0999 14 19.9999H10C10 21.0999 10.9 21.9999 12 21.9999ZM20 17.3499V18.9999H4V17.3499L6 15.4699V10.3199C6 7.39991 7.56 5.09992 10 4.33992V3.95991C10 2.53991 11.49 1.45991 12.99 2.19991C13.64 2.51991 14 3.22991 14 3.95991V4.34991C16.44 5.09991 18 7.40991 18 10.3299V15.4799L20 17.3499Z"
        />
      {:else}
        <path
          d="M10,20h4c0,1.1-0.9,2-2,2S10,21.1,10,20z M20,17.35V19H4v-1.65l2-1.88v-5.15c0-2.92,1.56-5.22,4-5.98V3.96 c0-1.42,1.49-2.5,2.99-1.76C13.64,2.52,14,3.23,14,3.96l0,0.39c2.44,0.75,4,3.06,4,5.98v5.15L20,17.35z M19,17.77l-2-1.88v-5.47 c0-2.47-1.19-4.36-3.13-5.1c-1.26-0.53-2.64-0.5-3.84,0.03C8.15,6.11,7,7.99,7,10.42v5.47l-2,1.88V18h14V17.77z"
        />
      {/if}
    </svg>
  </Checkbox>
  <Checkbox
    class="chakra-checkbox"
    label="Chakra"
    disabled={checkboxGroup.includes(1)}
    bind:group={checkboxGroup}
    value={2}
  >
    <svg viewBox="0 0 12 10" slot="checked-icon">
      <polyline points="1.5 6 4.5 9 10.5 1" />
    </svg>
    <svg viewBox="0 0 24 24" slot="indeterminate-icon">
      <line x1="21" x2="3" y1="12" y2="12" />
    </svg>
  </Checkbox>
  <Checkbox
    class="yandex-checkbox"
    label="Yandex"
    disabled={checkboxGroup.includes(1)}
    bind:group={checkboxGroup}
    value={2}
  >
    <svg width="18" height="18" slot="checked-icon">
      <path
        d="M15.623 1l-9.15 13.174-4.287-4.6L1 11.03 6.62 17 17 2.27 15.623 1z"
      />
    </svg>
    <svg width="17" height="17" slot="indeterminate-icon">
      <path d="M4 7h9v3H4z" />
    </svg>
  </Checkbox>
</div>

<hr />

<h5>Switch</h5>
<div class="flex flex-wrap items-center gap-4">
  <Switch label="Disable" bind:group={switchGroup} value={1} />
  <Switch
    disabled={switchGroup.includes(1)}
    bind:group={switchGroup}
    value={2}
    let:disabled
  >
    Disabled
    <a
      href="#123"
      tabindex={disabled ? -1 : null}
      style={disabled ? 'color: inherit' : ''}
    >
      Link
    </a>
  </Switch>
  <Switch
    class="android-switch"
    label="Android 12"
    disabled={switchGroup.includes(1)}
    bind:group={switchGroup}
    value={2}
  >
    <span slot="track">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
      </svg>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19,13H5V11H19V13Z" />
      </svg>
    </span>
  </Switch>
  <Switch
    class="ant-switch"
    label="Ant"
    disabled={switchGroup.includes(1)}
    bind:group={switchGroup}
    value={2}
  />
  <Switch
    class="shoelace-switch"
    label="Shoelace"
    disabled={switchGroup.includes(1)}
    bind:group={switchGroup}
    value={2}
  />
  <Switch
    class="MUI-switch"
    label="MUI"
    disabled={switchGroup.includes(1)}
    bind:group={switchGroup}
    value={2}
  >
    <svg viewBox="0 0 20 20" aria-hidden="true" slot="thumb" let:checked>
      {#if checked}
        <path
          d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"
        />
      {:else}
        <path
          d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"
        />
      {/if}
    </svg>
  </Switch>
  <Switch
    class="mui-switch"
    label="Mui"
    disabled={switchGroup.includes(1)}
    bind:group={switchGroup}
    value={2}
  />
</div>

<hr />

<div hidden1>
  <Test />
</div>

<style lang="postcss" global>
  :root {
    color-scheme: light;
    --dark-theme: 0;
    --color-theme: hsl(179 51% 39%);
    --color-text: hsl(218 23% 23%);
    --color-bg: #ffffff;
  }

  [data-theme='dark'] {
    color-scheme: dark;
    --dark-theme: 1;
    --color-theme: hsl(174 59% 56%);
    --color-text: hsl(0 0% 100% / 92%);
    --color-bg: hsl(220 26% 14%);
    --focus-ring-color: var(--color-text);
    --focus-ring-width: 2px;
    --focus-ring-offset: 3px;

    hr {
      background-color: rgb(255 255 255 / 16%);
    }

    --checkbox-color: hsl(0 0% 100% / 50%);
    --checkbox-disabled-color: hsl(0 0% 100% / 30%);
    --checkbox-icon-color: hsl(230 21% 11%);
    --radio-color: hsl(0 0% 100% / 50%);
    --radio-disabled-color: hsl(0 0% 100% / 30%);
    --radio-dot-color: hsl(230 21% 11%);
    --range-disabled-color: hsl(214 14% 60%);
    --range-rail-color: hsl(214 10% 50%);
    --range-rail-disabled-color: hsl(214 10% 42%);
    --range-mark-color: hsl(214 25% 70%);
    --range-mark-active-color: hsl(220 26% 14% / 60%);
    --range-tooltip-color: hsl(211 25% 84%);
    --range-tooltip-text-color: hsl(230 21% 11%);
    --range-mark-label-color: hsl(0 0% 100% / 70%);
    --range-mark-label-active-color: hsl(0 0% 100% / 92%);

    /* Checkbox dark */
    .checkbox {
      &__base {
        color: hsl(0 0% 100% / 50%);
      }
      &_disabled .checkbox__base {
        color: hsl(0 0% 100% / 30%);
      }
      &__box svg {
        color: hsl(230 21% 11%);
      }
    }

    /* Switch dark */
    .switch {
      &__track {
        background-color: hsl(0 0% 100% / 24%);
      }
    }

    /* Tabs dark */
    .tabs {
      &__tab:not(.tabs__tab_active) {
        border-color: hsl(0 0% 100% / 16%);
      }
    }

    /* Dialog dark */
    .dialog {
      &__content {
        background-color: hsl(218 23% 23%);
      }
    }

    /* Drawer dark */
    .drawer {
      background-color: hsl(218 23% 23%);
    }

    /* Button dark */
    .button {
      color: #1a202c;

      &_disabled {
        background-color: hsl(0 0% 100% / 0.15);
        color: hsl(0 0% 100% / 0.4);
      }
    }

    /* Input dark */
    .input {
      &__input {
        &:not(:focus) {
          border-color: hsl(0 0% 100% / 24%);
        }

        &::placeholder {
          color: hsl(0 0% 100% / 24%);
        }
      }
    }
  }

  body {
    font-family: 'Open Sans', sans-serif;
  }

  /* Range */
  .chakra-range.range {
    --range-outer-size: 24px;
    --range-color: hsl(209 62% 50%);
    --range-rail-color: hsl(214 32% 91%);
    --range-size: 4px;
    --range-thumb-size: 14px;
    --range-thumb-color: #ffffff;
    --range-transition: none;

    [data-theme='dark'] & {
      --range-color: hsl(203 82% 76%);
      --range-rail-color: #2c313d;
    }

    .range__base {
      border-radius: 2px;
    }
    .range__thumb {
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
        0 1px 2px 0 rgba(0, 0, 0, 0.06);
    }
    .range__handle_focus-visible .range__thumb {
      box-shadow: rgba(66, 153, 225, 0.6) 0px 0px 0px 3px;
    }
    .range__handle_active .range__thumb {
      transform: scale(1.15);
    }
  }

  .mui-range.range {
    --range-size: 4px;
    --range-track-size: 6px;
    --range-color: rgb(25, 118, 210);
    --range-disabled-color: #bdbdbd;
    --range-rail-color: #a8cbee;
    --range-rail-disabled-color: rgb(189 189 189 / 0.38);
    --range-thumb-size: 20px;
    --range-transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
    --range-mark-size: 2px;
    --range-mark-thickness: 2px;
    --range-mark-offset: 1px;
    --range-mark-color: currentColor;
    --range-mark-active-color: rgb(255 255 255 / 0.8);
    --range-mark-label-color: rgba(0, 0, 0, 0.6);
    --range-mark-label-active-color: rgba(0, 0, 0, 0.87);
    --range-tooltip-color: #757575;
    --range-tooltip-text-color: hsl(0 0% 100%);

    .range__base {
      border-radius: 12px;
    }
    .range__handle {
      &::after {
        content: '';
        position: absolute;
        transition: inherit;
        transition-property: transform;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: currentColor;
        border-radius: inherit;
        opacity: 0.16;
        transform: scale(0.95);
        z-index: -1;
      }
      &:where(:hover)::after,
      &_focus-visible::after {
        transform: scale(1.8);
      }
      &_pressed::after {
        transform: scale(2.4);
      }
    }
    .range__thumb {
      transform: none;
      box-shadow: rgb(0 0 0 / 20%) 0px 3px 1px -2px,
        rgb(0 0 0 / 14%) 0px 2px 2px 0px, rgb(0 0 0 / 12%) 0px 1px 5px 0px;
    }
    .range__tooltip {
      padding-bottom: 5px;
      opacity: 1;
      visibility: visible;
      transform-origin: bottom center;
      transform: translateX(-50%) scale(0);
    }
    .range__handle_open .range__tooltip {
      transform: translateX(-50%) scale(1);
    }
    .range__tooltip-value {
      font-weight: 500;
      font-size: 14px;
      border-radius: 2px;
      line-height: 1.43;
      padding: 4px 12px;
    }
    .range__tooltip-arrow {
      width: 11.3px;
      height: 5.7px;
    }
  }

  .ios-range.range {
    --range-size: 2px;
    --range-color: #3880ff;
    --range-disabled-color: #bdbdbd;
    --range-rail-color: #bfbfbf;
    --range-rail-disabled-color: var(--range-rail-color);
    --range-mark-size: 8px;
    --range-mark-thickness: 1px;
    --range-mark-offset: -3px;
    --range-mark-color: var(--range-rail-color);
    --range-mark-active-color: currentColor;
    --range-thumb-size: 28px;
    --range-thumb-color: #ffffff;
    --range-tooltip-text-color: rgba(0, 0, 0, 0.87);

    [data-theme='dark'] & {
      --range-color: rgb(56, 128, 255);
      --range-rail-color: rgb(191, 191, 191);
      --range-tooltip-text-color: rgb(255, 255, 255);
    }

    .range__rail {
      opacity: 0.5;
    }
    .range__thumb {
      box-shadow: 0 3px 1px rgb(0 0 0 / 10%), 0 4px 8px rgb(0 0 0 / 13%),
        0 0 0 1px rgb(0 0 0 / 2%);
      transform: none;
      transition: inherit;
      transition-property: box-shadow;
    }
    .range__handle_active .range__thumb,
    .range__handle:hover .range__thumb {
      box-shadow: 0 3px 1px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.3),
        0 0 0 1px rgba(0, 0, 0, 0.02);

      @media (hover: none) {
        box-shadow: 0 3px 1px rgb(0 0 0 / 10%), 0 4px 8px rgb(0 0 0 / 13%),
          0 0 0 1px rgb(0 0 0 / 2%);
      }
    }
    .range__tooltip-value {
      font-size: 12px;
      font-weight: normal;
      background-color: transparent;
      padding: 4px 12px;
    }
    .range__tooltip-arrow {
      display: none;
    }
  }

  .pretto-range.range {
    --range-size: 8px;
    --range-color: #52af77;
    --range-disabled-color: #bdbdbd;
    --range-rail-color: currentColor;
    --range-rail-disabled-color: currentColor;
    --range-thumb-size: 24px;

    .range__base {
      border-radius: 12px;
    }
    .range__rail {
      opacity: 0.38;
    }
    .range__thumb {
      transform: none;
      border: 2px solid currentColor;
      background-color: #ffffff;
    }
    .range__tooltip {
      opacity: 1;
      visibility: visible;
      line-height: 1.2;
      font-size: 12px;
      background: unset;
      padding: 0;
      margin-bottom: 4px;
      width: 32px;
      height: 32px;
      border-radius: 50% 50% 50% 0;
      background-color: #52af77;
      transform-origin: bottom left;
      transform: rotate(-45deg) scale(0);
    }
    .range__handle_open .range__tooltip {
      transform: rotate(-45deg) scale(1);
    }
    .range__tooltip-value {
      transform: rotate(45deg);
      padding: 1px 0 0;
      width: 100%;
      height: 100%;
      align-items: center;
      background-color: transparent;
      line-height: 1.2;
      font-size: 12px;
      font-weight: 600;
      color: #ffffff;
      border-radius: 50%;
    }
    .range__tooltip-arrow {
      display: none;
    }
  }

  .airbnb-range.range {
    --range-outer-size: 29px;
    --range-size: 3px;
    --range-track-size: 5px;
    --range-rail-color: #d8d8d8;
    --range-rail-disabled-color: var(--range-rail-color);
    --range-color: #3a8589;
    --range-disabled-color: #bdbdbd;
    --range-thumb-size: 27px;

    [data-theme='dark'] & {
      --range-rail-color: rgb(191 191 191 / 0.38);
    }

    .range__base {
      border-radius: 12px;
    }
    .range__handle {
      &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: inherit;
        transform: scale(0.95);
        transition: inherit;
        transition-property: transform;
        background-color: currentColor;
        opacity: 0.16;
        z-index: -1;
      }
      &_active::after,
      &:hover::after {
        transform: scale(1.6);
      }
    }
    .range__thumb {
      transform: none;
      background-color: #ffffff;
      border: 1px solid currentColor;
      box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
        0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .airbnb-range__thumb-bars {
      display: flex;
    }
    .airbnb-range__thumb-bar {
      height: 9px;
      width: 1px;
      background-color: currentColor;
      margin-left: 1px;
      margin-right: 1px;
    }
  }

  /* Button */
  .mui-button.button {
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 1.75;
    letter-spacing: 0.02857em;
    text-transform: uppercase;
    min-width: 64px;
    padding: 6px 16px;
    border-radius: 4px;
    outline: 0;
    box-shadow: none;

    &_contained {
      --mui-button-color: hsl(210 79% 46%);
      --mui-button-text-color: #ffffff;
      --mui-button-hover-color: hsl(212 80% 42%);

      [data-theme='dark'] & {
        --mui-button-color: hsl(207 90% 77%);
        --mui-button-hover-color: hsl(207 90% 61%);
        --mui-button-text-color: rgba(0, 0, 0, 0.87);
      }

      border-color: transparent;
      background-color: var(--mui-button-color);
      color: var(--mui-button-text-color);
      box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
        0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);

      &:hover,
      &.button_focus-visible {
        background-color: var(--mui-button-hover-color);
        box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
          0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
      }
      &:active {
        box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%),
          0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
      }
    }
    &_outlined {
      --mui-button-color-hsl: 210 79% 46%;
      --mui-button-bg-hover-color: hsl(var(--mui-button-color-hsl) / 4%);

      [data-theme='dark'] & {
        --mui-button-color-hsl: 207 90% 77%;
        --mui-button-bg-hover-color: hsl(var(--mui-button-color-hsl) / 8%);
      }

      color: hsl(var(--mui-button-color-hsl));
      background-color: transparent;
      border: 1px solid hsl(var(--mui-button-color-hsl) / 50%);

      &:hover,
      &.button_focus-visible {
        background-color: var(--mui-button-bg-hover-color);
        border: 1px solid hsl(var(--mui-button-color-hsl));
      }
    }
  }

  .chakra-button.button {
    height: 40px;
    padding: 0 16px;
    border-radius: 6px;
    font-weight: 600;
    font-size: 16px;
    outline: 0;

    &_focus-visible {
      box-shadow: 0 0 0 3px hsl(207 73% 57% / 60%);
    }

    &_solid {
      --chakra-button-color: hsl(209 62% 50%);
      --chakra-button-text-color: #ffffff;
      --chakra-button-hover-color: hsl(211 61% 43%);
      --chakra-button-active-color: hsl(213 49% 34%);

      [data-theme='dark'] & {
        --chakra-button-color: hsl(203 82% 76%);
        --chakra-button-text-color: hsl(220 26% 14%);
        --chakra-button-hover-color: hsl(205 79% 66%);
        --chakra-button-active-color: hsl(207 73% 57%);
      }

      background-color: var(--chakra-button-color);
      border-color: transparent;
      color: var(--chakra-button-text-color);

      &:hover {
        background-color: var(--chakra-button-hover-color);
      }
      &:active {
        background-color: var(--chakra-button-active-color);
      }
    }
    &_outline {
      --chakra-button-color: hsl(211 61% 43%);
      --chakra-button-bg-hover-color: hsl(201 100% 96%);
      --chakra-button-bg-active-color: hsl(202 81% 86%);

      [data-theme='dark'] & {
        --chakra-button-color: hsl(203 82% 76%);
        --chakra-button-bg-hover-color: hsl(203 82% 76% / 12%);
        --chakra-button-bg-active-color: hsl(203 82% 76% / 24%);
      }

      background-color: transparent;
      border-color: var(--chakra-button-color);
      color: var(--chakra-button-color);

      &:hover {
        background-color: var(--chakra-button-bg-hover-color);
      }
      &:active {
        background-color: var(--chakra-button-bg-active-color);
      }
    }
  }

  /* Radio */
  .mui-radio.radio {
    --radio-size: 20px;
    --radio-color: hsl(0 0% 0% / 60%);
    --radio-active-color: hsl(210 79% 46%);
    --radio-disabled-color: hsl(0 0% 0% / 26%);

    [data-theme='dark'] & {
      --radio-color: hsl(0 0% 100% / 70%);
      --radio-active-color: hsl(207 90% 77%);
      --radio-disabled-color: rgb(255 255 255 / 30%);
    }

    .radio__base {
      outline: 0;
      transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1);
      display: grid;

      &::before {
        width: 40px;
        height: 40px;
      }

      svg {
        grid-area: 1 / -1;

        &:last-child {
          transform: scale(0);
          transition: transform 150ms cubic-bezier(0, 0, 0.2, 1);
        }
      }
    }
    &_checked .radio__base {
      svg:last-child {
        transform: scale(1);
      }
    }
    &_focus-visible .radio__base::before {
      background-color: currentColor;
      animation: ripple-check 150ms var(--ease-out) forwards;
    }
    &_focus-visible&_checked .radio__base::before {
      animation: ripple-checked 150ms var(--ease-out) forwards;
    }
  }

  .button-radio.radio {
    --radio-border-color: #e2e8f0;

    [data-theme='dark'] & {
      --radio-border-color: rgba(255, 255, 255, 0.16);
    }

    .radio__base {
      display: block;
      padding: 4px 7px;
      border-radius: 4px;
      box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
        rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
      border: 1px solid var(--radio-border-color);
      color: inherit;
      font-size: 14px;
      outline: 0;
    }
    &_checked .radio__base {
      background-color: rgb(44, 122, 123);
      border-color: rgb(44, 122, 123);
      color: #ffffff;
    }
    &_focus-visible .radio__base {
      box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.6);
    }
    &_disabled .radio__base {
      filter: grayscale(1) opacity(0.6);
    }
  }

  .carbon-radio.radio {
    --radio-size: 18px;
    --radio-color: #161616;
    --radio-active-color: var(--radio-color);
    --radio-disabled-color: #c6c6c6;
    --radio-dot-color: var(--radio-color);
    --radio-dot-disabled-color: var(--radio-disabled-color);
    --radio-focus-ring-color: rgb(15, 98, 254);

    [data-theme='dark'] & {
      --radio-color: #f4f4f4;
      --radio-disabled-color: #6f6f6f;
      --radio-focus-ring-color: rgb(255, 255, 255);
    }

    .radio__base {
      outline: 0;
    }
    &_focus-visible .radio__base {
      box-shadow: 0 0 0 2px var(--radio-focus-ring-color);
    }
    .radio__box {
      font-size: 8px;
      border-width: 1px;
    }
    &_checked .radio__box {
      background-color: transparent;
    }
    &_checked&_disabled .radio__box {
      background-color: transparent;
    }
  }

  /* Checkbox */
  @define-mixin ripple $name {
    @keyframes $name {
      0% {
        transform: translate(-50%, -50%) scale(0);
        opacity: 0;
      }
      100% {
        transform: translate(-50%, -50%) scale(1);
        opacity: var(--ripple-opacity, 0.15);
      }
    }
  }
  @mixin ripple ripple-check;
  @mixin ripple ripple-checked;

  .mui-checkbox.checkbox {
    --checkbox-size: 18px;
    --mui-checkbox-color: hsl(0 0% 0% / 60%);
    --mui-checkbox-checked-color: hsl(210 79% 46%);
    --mui-checkbox-disabled-color: hsl(0 0% 0% / 26%);

    [data-theme='dark'] & {
      --mui-checkbox-color: hsl(0 0% 100% / 70%);
      --mui-checkbox-checked-color: hsl(207 90% 77%);
      --mui-checkbox-disabled-color: rgb(255 255 255 / 30%);
    }

    .checkbox__base {
      box-shadow: none;
      border-radius: 50%;
      color: var(--mui-checkbox-color);

      &::before {
        width: 40px;
        height: 40px;
      }
    }
    &_checked .checkbox__base,
    &_indeterminate .checkbox__base {
      color: var(--mui-checkbox-checked-color);
    }
    &_disabled .checkbox__base {
      color: var(--mui-checkbox-disabled-color);
    }
    &_focus-visible .checkbox__base::before {
      background-color: currentColor;
      animation: ripple-check 150ms var(--ease-out) forwards;
    }
    &_focus-visible&_checked .checkbox__base::before {
      animation: ripple-checked 150ms var(--ease-out) forwards;
    }
  }

  .blueprint-checkbox.checkbox {
    --checkbox-size: 16px;
    --checkbox-label-line-height: 1.28581;
    --checkbox-color: #f5f8fa;
    --checkbox-active-color: #137cbd;
    --checkbox-disabled-color: rgba(206, 217, 224, 0.5);
    --checkbox-icon-color: #ffffff;

    --checkbox-hover-color: #ebf1f5;
    --checkbox-box-shadow: inset 0 0 0 1px rgba(16, 22, 26, 0.2),
      inset 0 -1px 0 rgba(16, 22, 26, 0.1);
    --checkbox-box-gradient: linear-gradient(
      180deg,
      hsla(0, 0%, 100%, 0.8),
      hsla(0, 0%, 100%, 0)
    );
    --checkbox-box-active-gradient: linear-gradient(
      180deg,
      hsla(0, 0%, 100%, 0.1),
      hsla(0, 0%, 100%, 0)
    );

    [data-theme='dark'] & {
      --checkbox-color: #394b59;
      --checkbox-disabled-color: rgba(57, 75, 89, 0.5);
      --checkbox-hover-color: #30404d;
      --checkbox-box-shadow: 0 0 0 1px rgb(16 22 26 / 40%);
      --checkbox-box-gradient: linear-gradient(
        180deg,
        hsla(0, 0%, 100%, 0.05),
        hsla(0, 0%, 100%, 0)
      );
    }

    &:hover {
      --checkbox-active-color: #106ba3;
      --checkbox-color: var(--checkbox-hover-color);
    }

    .checkbox__base {
      border-radius: 3px;
    }
    &_focus-visible .checkbox__base {
      outline: 2px auto rgba(19, 124, 189, 0.6);
      outline-offset: 2px;
    }
    .checkbox__box {
      border: 0;
      background-image: var(--checkbox-box-gradient);
      background-color: var(--checkbox-color);
      box-shadow: var(--checkbox-box-shadow);
    }
    &_checked .checkbox__box,
    &_indeterminate .checkbox__box {
      background-image: var(--checkbox-box-active-gradient);
      background-color: var(--checkbox-active-color);
    }
    &_disabled .checkbox__box {
      background: var(--checkbox-disabled-color);
      box-shadow: none;
    }
    .checkbox__label {
      font-size: 14px;
    }
  }

  .notify-checkbox.checkbox {
    --checkbox-size: 24px;
    --checkbox-color: currentColor;
    --checkbox-active-color: var(--checkbox-color);

    .checkbox__base {
      outline: 0;
      border-radius: 50%;

      &::before {
        width: 40px;
        height: 40px;
      }
    }

    &_focus-visible .checkbox__base::before {
      background-color: currentColor;
      animation: ripple-check 150ms var(--ease-out) forwards;
    }

    &_focus-visible&_checked .checkbox__base::before {
      animation: ripple-checked 150ms var(--ease-out) forwards;
    }
  }

  .chakra-checkbox.checkbox {
    --checkbox-size: 16px;
    --checkbox-color: #e2e8f0;
    --checkbox-active-color: #3182ce;
    --checkbox-active-hover-color: #2b6cb0;
    --checkbox-disabled-color: #e2e8f0;
    --checkbox-icon-color: #ffffff;
    --checkbox-icon-disabled-color: #718096;

    [data-theme='dark'] & {
      --checkbox-color: rgb(255 255 255 / 0.16);
      --checkbox-active-color: #90cdf4;
      --checkbox-active-hover-color: #63b3ed;
      --checkbox-disabled-color: rgb(255 255 255 / 0.16);
      --checkbox-icon-color: #171923;
      --checkbox-icon-disabled-color: rgba(255 255 255 / 0.36);
    }

    .checkbox__base {
      outline: 0;

      &:hover {
        --checkbox-active-color: var(--checkbox-active-hover-color);
      }
    }
    &_focus-visible .checkbox__base {
      box-shadow: 0 0 0 3px rgb(66 153 225 / 0.6);
    }
    .checkbox__box {
      border-width: 2px;

      svg {
        fill: none;
        stroke: currentcolor;
      }
    }
    &_checked .checkbox__box {
      font-size: 10px;

      svg {
        stroke-width: 2;
        stroke-dasharray: 16;
        animation: checked-icon 250ms cubic-bezier(0.4, 0, 0.2, 1) both;
      }

      @keyframes checked-icon {
        0% {
          opacity: 0.5;
          stroke-dashoffset: 16;
        }
        100% {
          opacity: 1;
          stroke-dashoffset: 0;
        }
      }
    }
    &_indeterminate .checkbox__box {
      font-size: 12px;

      svg {
        stroke-width: 4;
        animation: indeterminate-icon 200ms cubic-bezier(0.4, 0, 0.2, 1) both;
      }

      @keyframes indeterminate-icon {
        0% {
          opacity: 0.5;
          transform: scaleX(0.7);
        }
        100% {
          opacity: 1;
          transform: none;
        }
      }
    }
    &_indeterminate&_disabled .checkbox__box {
      color: var(--checkbox-icon-color);
    }
    &_disabled .checkbox__box {
      background-color: var(--checkbox-disabled-color);
      border-color: transparent;
    }
  }

  .yandex-checkbox.checkbox {
    --checkbox-size: 17px;
    --checkbox-color: rgba(0, 0, 0, 0.2);
    --checkbox-active-color: hsl(47 100% 81%);
    --checkbox-disabled-color: hsl(218 10% 74%);
    --checkbox-icon-color: #000000;
    --checkbox-hover-color: rgba(0, 0, 0, 0.3);
    --checkbox-border-active-color: rgba(153, 122, 0, 0.5);
    --checkbox-border-active-hover-color: rgba(129, 103, 0, 0.6);

    [data-theme='dark'] & {
      --checkbox-color: rgba(255, 255, 255, 0.3);
      --checkbox-hover-color: rgba(255, 255, 255, 0.4);
      --checkbox-disabled-color: hsl(0 0% 100% / 30%);
      --checkbox-border-active-color: hsl(47 100% 81%);
      --checkbox-border-active-hover-color: hsl(47 90% 62%);
    }

    &:hover {
      --checkbox-color: var(--checkbox-hover-color);
      --checkbox-border-active-color: var(--checkbox-border-active-hover-color);
    }

    .checkbox__base {
      border-radius: 3px;
      outline: 0;
    }
    .checkbox__box {
      border-width: 1px;
      background-clip: padding-box;

      svg {
        height: auto;
      }
    }
    &_checked .checkbox__box {
      svg {
        position: relative;
        left: 3px;
        bottom: 4px;
      }
    }
    &_checked .checkbox__box,
    &_indeterminate .checkbox__box {
      border-color: var(--checkbox-border-active-color);
    }
    &_focus-visible .checkbox__box {
      border-width: 2px;
      border-color: #ffdb4d;
    }
    &_checked&_disabled .checkbox__box,
    &_indeterminate&_disabled .checkbox__box {
      border-color: var(--checkbox-disabled-color);
    }
    &_focus-visible&_checked .checkbox__box {
      border-color: #fc0;
    }
  }

  /* Switch */
  .android-switch.switch {
    --switch-width: 42px;
    --switch-height: 22px;
    --switch-thumb-size: 16px;
    --android-switch-color: hsl(0 0% 0% / 0.38);
    --android-switch-checked-color: hsl(210 79% 46% / 0.5);
    --android-switch-thumb-color: #ffffff;
    --android-switch-thumb-checked-color: #1976d2;
    --android-switch-icon-color: #ffffff;

    [data-theme='dark'] & {
      --android-switch-color: rgb(255 255 255 / 0.3);
      --android-switch-checked-color: hsl(210 60% 46% / 0.7);
      --android-switch-thumb-color: rgb(224 224 224);
      --android-switch-thumb-checked-color: rgb(144 202 249);
      --android-switch-icon-color: rgba(0 0 0 / 0.87);
    }

    .switch__track {
      background-color: var(--android-switch-color);
      font-size: 16px;
      color: var(--android-switch-icon-color);
      position: relative;
      box-shadow: none;

      svg {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);

        &:first-child {
          left: 4px;
        }
        &:last-child {
          right: 4px;
        }
      }
    }
    &_checked .switch__track {
      background-color: var(--android-switch-checked-color);
    }
    .switch__thumb {
      background-color: var(--android-switch-thumb-color);

      &::before {
        content: '';
        position: absolute;
        width: 240%;
        height: 240%;
        top: 50%;
        left: 50%;
        border-radius: inherit;
        background-color: inherit;
        transform: translate(-50%, -50%) scale(0);
        opacity: 0;
        transition: 200ms var(--ease-out);
        transition-properties: transform, opacity;
      }
    }
    &_checked .switch__thumb {
      background-color: var(--android-switch-thumb-checked-color);
    }
    &_focus-visible .switch__thumb::before {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0.2;
    }
  }

  .ant-switch.switch {
    --switch-width: 44px;
    --switch-height: 22px;
    --switch-thumb-size: 18px;
    --ant-switch-color: hsl(0 0% 0% / 25%);
    --ant-switch-checked-color: hsl(209 100% 55%);
    --ant-switch-outline-color: hsl(0 0% 0% / 10%);
    --ant-switch-outline-checked-color: hsl(199 100% 95%);

    [data-theme='dark'] & {
      --ant-switch-color: hsl(0 0% 100% / 30%);
      --ant-switch-checked-color: hsl(209 81% 48%);
      --ant-switch-outline-color: rgb(255 255 255 / 10%);
      --ant-switch-outline-checked-color: hsl(209 81% 48% / 30%);
    }

    .switch__track {
      background-color: var(--ant-switch-color);
      transition-duration: 0.2s;
      transition-timing-function: ease-in-out;
    }
    &_checked .switch__track {
      background-color: var(--ant-switch-checked-color);
    }
    &_focus-visible .switch__track {
      box-shadow: 0 0 0 2px var(--ant-switch-outline-color);
    }
    &_checked&_focus-visible .switch__track {
      box-shadow: 0 0 0 2px var(--ant-switch-outline-checked-color);
    }
    .switch__thumb {
      background-color: #ffffff;

      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ffffff;
        border-radius: inherit;
        transition: inherit;
        transition-property: left, right;
        box-shadow: 0 2px 4px hsl(139 100% 7% / 20%);
      }
    }
    .switch__input:active + .switch__track .switch__thumb,
    &:active .switch__thumb {
      &:before {
        right: -30%;
      }
    }
    &_checked .switch__input:active + .switch__track .switch__thumb,
    &_checked:active .switch__thumb {
      &:before {
        right: 0;
        left: -30%;
      }
    }
  }

  .shoelace-switch.switch {
    --switch-width: 32px;
    --switch-height: 16px;
    --switch-thumb-size: 20px;
    --shoelace-switch-color: hsl(240 5% 65%);
    --shoelace-switch-checked-color: hsl(200 98% 39%);
    --shoelace-switch-outline-color: rgb(14 165 233 / 0.4);

    [data-theme='dark'] & {
      --shoelace-switch-color: hsl(240 5% 35%);
      --shoelace-switch-checked-color: hsl(199 98% 62%);
      --shoelace-switch-outline-color: rgb(31 170 238 / 0.4);
    }

    .switch__track {
      background-color: var(--shoelace-switch-color);
      box-shadow: none;
      transition-duration: 150ms;
      transition-timing-function: ease;
    }
    &_checked .switch__track {
      background-color: var(--shoelace-switch-checked-color);
    }
    .switch__thumb {
      background-color: var(--color-bg);
      border: 1px solid var(--shoelace-switch-color);
    }
    &_checked .switch__thumb {
      border-color: var(--shoelace-switch-checked-color);
    }
    &_focus-visible .switch__thumb {
      border-color: var(--shoelace-switch-checked-color);
      box-shadow: 0 0 0 3px var(--shoelace-switch-outline-color);
    }
  }

  .MUI-switch.switch {
    --switch-width: 48px;
    --switch-height: 20px;
    --switch-thumb-size: 32px;
    --switch-thumb-left: -1px;
    --MUI-switch-color: hsl(210 13% 71%);
    --MUI-switch-thumb-color: #001e3c;

    [data-theme='dark'] & {
      --MUI-switch-color: #8796a5;
      --MUI-switch-thumb-color: #003892;
    }

    .switch__track {
      box-shadow: none;
      background-color: var(--MUI-switch-color);
    }
    .switch__thumb {
      background-color: var(--MUI-switch-thumb-color);
      color: #ffffff;
      font-size: 20px;
      box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
        0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
      display: grid;
      place-items: center;

      &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 50%;
        left: 50%;
        border-radius: inherit;
        background-color: #ffffff;
        transform: translate(-50%, -50%) scale(0);
        opacity: 0;
        transition: 200ms var(--ease-out);
        transition-properties: transform, opacity;
      }
    }
    &_focus-visible .switch__thumb::before {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0.35;
    }
  }

  .mui-switch.switch {
    --switch-width: 34px;
    --switch-height: 14px;
    --switch-thumb-size: 20px;
    --mui-switch-color: hsl(0 0% 0% / 0.38);
    --mui-switch-checked-color: hsl(210 79% 46% / 0.5);
    --mui-switch-thumb-color: #ffffff;
    --mui-switch-thumb-checked-color: hsl(210 79% 46%);

    [data-theme='dark'] & {
      --mui-switch-color: hsl(0 0% 100% / 0.3);
      --mui-switch-checked-color: hsl(207 90% 77% / 0.5);
      --mui-switch-thumb-color: rgb(224, 224, 224);
      --mui-switch-thumb-checked-color: hsl(207 90% 77%);
    }

    .switch__track {
      box-shadow: none;
      background-color: var(--mui-switch-color);
    }
    &_checked .switch__track {
      background-color: var(--mui-switch-checked-color);
    }
    .switch__thumb {
      background-color: var(--mui-switch-thumb-color);
      box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
        0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);

      &::before {
        content: '';
        position: absolute;
        width: 190%;
        height: 190%;
        top: 50%;
        left: 50%;
        border-radius: inherit;
        background-color: inherit;
        transform: translate(-50%, -50%) scale(0);
        opacity: 0;
        transition: 200ms var(--ease-out);
        transition-properties: transform, opacity;
      }
    }
    &_checked .switch__thumb {
      background-color: var(--mui-switch-thumb-checked-color);
    }
    &_focus-visible .switch__thumb::before {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0.3;
    }
  }
</style>

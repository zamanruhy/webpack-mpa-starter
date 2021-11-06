<script>
  import Input from '@/components/common/Input.svelte'
  import Checkbox from '@/components/common/Checkbox.svelte'
  import Switch from '@/components/common/Switch.svelte'
  import Radio from '@/components/common/Radio.svelte'
  import FileInput from '@/components/common/FileInput.svelte'
  import { Swiper, SwiperSlide } from '@/components/common/swiper'
  import Collapse from '@/components/common/Collapse.svelte'
  import Button from '@/components/common/Button.svelte'
  import { Tabs, TabList, Tab, TabPanel } from '@/components/common/tabs'
  import Icon from '@/components/common/Icon.svelte'
  import Modal from '@/components/common/Modal.svelte'
  import Drawer from '@/components/common/Drawer.svelte'
  import Range from '@/components/common/Range.svelte'
  import Field from '@/components/common/Field.svelte'
  import Spinner from '@/components/common/Spinner.svelte'
  import Vertical from '@/components/common/App/VerticalRhythm.svelte'
  import { bp } from '@/helpers/bp'
  import {
    collapseAction,
    modalAction,
    portalAction,
    intersectAction
  } from '@/actions'
  // import '@/assets/img/34A3721C-53F0-4371-ABB9-F7CB9C94F053_w1200_r1.jpg'
  import houseIcon from '@/assets/svg/house.svg'
  import logoIcon from '@/assets/svg/logo.svg'
  import closeIcon from '@/assets/svg/close.svg'
  import lockIcon from '@/assets/svg/lock.svg'
  import inIcon from '@/assets/svg/in.svg'

  let range = 5
  let inputValue = ''
  let checked = true
  let check = true
  let switchChecked = false
  let group = [1]
  let nativeGroup = [1]
  let radio = 2
  let flavours = ['Orange', 'Grape', 'Apple', 'Lime', 'Very Berry']
  let selected = []
  let allSelected = false
  let indeterminate = false

  $: if (selected.length === 0) {
    allSelected = false
    indeterminate = false
  } else if (selected.length === flavours.length) {
    allSelected = true
    indeterminate = false
  } else {
    allSelected = false
    indeterminate = true
  }

  let file
  let slideIndex = 2
  let open = true
  let tabsRange = 10
  let tabIndex = 8
  let iconsCount = 1
  let intersecting = false
  let modalOpen = false
  let modalInputValue = ''
  let prev
  let next
  const icons = [
    { data: houseIcon, img: false },
    { data: logoIcon, img: true },
    { data: closeIcon, img: false },
    { data: lockIcon, img: true },
    { data: inIcon, img: false }
  ]
  let buttonIcon = icons[0]
  let buttonSize = ''
  let buttonHasIcon = true
  let buttonIconLeft = true
  let buttonLoading = false
  let buttonDisabled = false
  let buttonText = 'More icons more'
  let switched = true
  let value = 33
  let intersectOnce = false
  let intersected = false
  let placement = 'start'
  let collapsedClass = 'collapsed'

  $: step = switched ? 2 : 7
  $: swiperOptions = {
    navigation: {
      prevEl: prev?.el,
      nextEl: next?.el
    },
    pagination: true,
    slidesPerView: 2,
    spaceBetween: 20,
    keyboard: true
  }

  function onEvent(e) {
    console.log(e)
  }

  let arrobj = [
    {
      id: 'first-trigger',
      name: 'First trigger',
      text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis soluta ab fugit eius itaque expedita cumque nostrum eaque earum fugiat.'
    },
    {
      id: 'second-trigger',
      name: 'Second trigger',
      text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis soluta ab fugit eius itaque expedita cumque nostrum eaque earum fugiat.'
    },
    {
      id: 'third-trigger',
      name: 'Third trigger',
      text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis soluta ab fugit eius itaque expedita cumque nostrum eaque earum fugiat.'
    }
  ]

  let lazyComp
  function loadComp() {
    console.log('loadComp')
    lazyComp = import(
      /* webpackChunkName: "rhythm" */ './VerticalRhythm.svelte'
    )
  }

  // $: console.log('value from Test.svelte', value)

  function getMarks() {
    const min = 0
    const max = 10000
    const marks = []
    let step = 200

    for (let n = min; n <= max; n += step) {
      step = (n < 1000 && 200) || (n < 5000 && 500) || 1000
      marks.push({ value: n, label: [min, max].includes(n) ? `${n}` : null })
      // marks.push({ value: n, label: `${n}` })
    }

    return marks
  }

  const marks = getMarks()

  const marksAnother = [
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

  let rangeValue = [20, 50]
  const minDistance = 10
  function rangeUpdate({ detail: { value, activeIndex } }) {
    if (value[1] - value[0] < minDistance) {
      if (activeIndex === 0) {
        const clamped = Math.min(value[0], 100 - minDistance)
        rangeValue = [clamped, clamped + minDistance]
      } else {
        const clamped = Math.max(value[1], minDistance)
        rangeValue = [clamped - minDistance, clamped]
      }
    } else {
      rangeValue = value
    }
  }

  function valueLabelFormat(value) {
    const units = ['KB', 'MB', 'GB', 'TB']

    let unitIndex = 0
    let scaledValue = value

    while (scaledValue >= 1024 && unitIndex < units.length - 1) {
      unitIndex += 1
      scaledValue /= 1024
    }

    return `${scaledValue} ${units[unitIndex]}`
  }

  function calculateValue(value) {
    return 2 ** value
  }

  // let someEl
  // // $: console.log('someEl:', someEl)
  // async function someAction(node, param) {
  //   // await Promise.resolve()
  //   console.log('paramEl:', param())
  // }
</script>

<!-- <p bind:this={someEl} />
<div use:someAction={() => someEl} /> -->

<!-- <Vertical {someEl} /> -->

{#if lazyComp}
  {#await lazyComp}
    <Spinner size={36} width={2} />
  {:then { default: VerticalRhythm }}
    <VerticalRhythm />
  {:catch e}
    {e}
  {/await}
{:else}
  <Button variant="primary" on:click={loadComp}>Load Vertical Rhythm</Button>
{/if}

<!-- {#each arrobj as obj (obj.id)}
  <Button
    variant="primary"
    style="display: flex"
    use={[[collapse, { id: obj.id }]]}
  >
    {obj.name}
  </Button>
  <Collapse id={obj.id} accordion="trigger" open>
    {obj.text}
  </Collapse>
{/each} -->

<hr />
<Range
  value={10}
  min={5}
  step={1}
  max={30}
  marks
  scale={calculateValue}
  getAriaValueText={valueLabelFormat}
  tooltipFormat={valueLabelFormat}
  tooltipDisplay="auto"
  aria-labelledby="non-linear-slider"
/>
<hr />

<Range
  reversed
  step={null}
  value={[marks[10].value, marks[16].value]}
  min={marks[0].value}
  max={marks[marks.length - 1].value}
  tooltipDisplay="never"
  tooltipFormat1={(v) => marks.findIndex((m) => m.value === v) + 1}
  {marks}
  track={'inverted'}
  scale1={(x) => (x < 50 ? x / 2 : x * 2)}
  disabled1
>
  <!-- <div
    slot="tooltip"
    let:value
    style="display: contents"
    on:pointerdown|stopPropagation
  >
    <Switch checked label={value} />
  </div>
  <Icon
    {...icons[index]}
    slot="thumb"
    let:index
    style="font-size: {1 +
      index * 0.5}rem; background-color: #ffffff; border: 1px solid #999;"
  /> -->
</Range>
<div style="height: 1px" />
<hr />
{JSON.stringify(rangeValue)}
<Range
  step={5}
  value={rangeValue}
  min={0}
  max={100}
  marks={true}
  tooltipDisplay1={value >= 50 ? 'auto' : 'never'}
  tooltipFormat={(v) => `${v}°C`}
  on:update={rangeUpdate}
/>
<div style="height: 1px" />
<hr />
<Range
  value={0.00000005}
  getAriaLabel={(i) => `Label ${i}`}
  getAriaValueText={(v) => `${v}°C`}
  aria-labelledby="discrete-slider-small-steps"
  step={0.00000001}
  marks
  min={-0.00000005}
  max={0.0000001}
  tooltipDisplay={switched ? 'auto' : 'always'}
  name="price-range"
  disabled={switched}
/>
<hr />
<div style={switched ? `height: 300px; display: flex; gap: 48px;` : null}>
  <Range
    vertical={switched}
    {step}
    value={[33, 55, 88]}
    min={0}
    max={100}
    tooltipFormat={(v) => `${v}°C`}
    marks={marksAnother}
  />
  <Range
    reversed
    vertical={switched}
    step={null}
    value={77}
    min={0}
    max={110}
    tooltipFormat={(v) => `${v}°C`}
    marks={marksAnother}
    disabled
  />
  <!-- <Range
    vertical
    value={0.00000005}
    getAriaLabel={(i) => `Label ${i}`}
    getAriaValueText={(value) => `${value}°C`}
    aria-labelledby="discrete-slider-small-steps"
    step={0.00000001}
    marks
    min={-0.00000005}
    max={0.0000001}
    thumbLabelDisplay={switched ? 'auto' : 'on'}
    name="price-range"
    disabled={switched}
  /> -->
</div>
<hr />
<div>{JSON.stringify(value)}</div>
<hr />
<Switch bind:checked={switched} label="Switch" />
{switched}
<hr />
<Field label="Size">
  <div class="flex gap-4" role="radiogroup" aria-label="Size">
    <Radio
      bind:group={buttonSize}
      label="Small"
      name="button-size"
      value="small"
    />
    <Radio
      bind:group={buttonSize}
      label="Default"
      name="button-size"
      value=""
    />
    <Radio
      bind:group={buttonSize}
      label="Large"
      name="button-size"
      value="large"
    />
  </div>
</Field>
<hr />
<Field label="Options">
  <div class="flex gap-4">
    <Checkbox bind:checked={buttonHasIcon} label="Has icon" />
    <Checkbox
      bind:checked={buttonIconLeft}
      label="Icon left"
      disabled={!buttonHasIcon}
    />
    <Checkbox bind:checked={buttonLoading} label="Loading" />
    <Checkbox bind:checked={buttonDisabled} label="Disabled" />
  </div>
</Field>
<hr />
<Field label="Button text" labelFor="form-blah">
  <Input bind:value={buttonText} id="form-blah" />
</Field>
<hr />
<h6>Drawer</h6>
<Button variant="primary" use={[[modalAction, 'content-drawer']]}>
  Open Drawer
</Button>
<Drawer id="content-drawer" {placement} let:close getParentEl={() => false}>
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
  <div class="flex gap-4 mt-4 mb-4">
    <Radio bind:group={placement} name="placement" value="start">Start</Radio>
    <Radio bind:group={placement} name="placement" value="end">End</Radio>
    <Radio bind:group={placement} name="placement" value="top">Top</Radio>
    <Radio bind:group={placement} name="placement" value="bottom">Bottom</Radio>
  </div>
  <footer>
    <Button variant="primary" on:click={close}>Close</Button>
  </footer>
</Drawer>

<hr />

<Button
  class="mb-4"
  variant="primary"
  size={buttonSize}
  loading={buttonLoading}
  disabled={buttonDisabled}
  on:click={() => iconsCount++}
>
  {#if buttonHasIcon && buttonIconLeft}
    <Icon {...buttonIcon} style="margin-right: 4px;" />
  {/if}
  {buttonText}
  {#if buttonHasIcon && !buttonIconLeft}
    <Icon {...buttonIcon} style="margin-left: 4px;" />
  {/if}
</Button>

{#each [...Array(iconsCount).keys()] as num (num)}
  <p
    class="flex gap-4"
    style="font-size: 30px; color: rebeccapurple; --in-outer-color: red; --in-inner-color: blue; --in-dot-color: green;"
  >
    {#each icons as icon (icon.data.id)}
      <Icon {...icon} style="margin: 0" on:click={() => (buttonIcon = icon)} />
    {/each}
  </p>
{/each}

<Tabs bind:index={tabIndex}>
  <TabList>
    {#each [...Array(tabsRange).keys()] as num (num)}
      <Tab>Tab {num + 1}</Tab>
    {/each}
  </TabList>
  {#each [...Array(tabsRange).keys()] as num (num)}
    <TabPanel>
      <Tabs index={1}>
        <TabList>
          {#each [...Array(4).keys()] as num (num)}
            <Tab>Tab {num + 1}</Tab>
          {/each}
        </TabList>
        {#each [...Array(4).keys()] as num (num)}
          <TabPanel>Panel {num + 1}</TabPanel>
        {/each}
      </Tabs>
    </TabPanel>
  {/each}
</Tabs>

<Input
  id="tab-index"
  label="Tab index"
  type="number"
  bind:value={tabIndex}
  min="0"
  max={tabsRange - 1}
/>
<br />
<input
  type="range"
  min="1"
  max="20"
  bind:value={tabsRange}
  style="width: 100%"
/>

<br />

<br />

<p>
  <Button
    variant="primary"
    use={[[collapseAction, { id: 'test-collapse', class: 'collapsed-class' }]]}
  >
    <Icon data={houseIcon} style="margin-right: 4px;" />
    Toogle
  </Button>
  {slideIndex}
</p>
<Collapse id="test-collapse" open>
  <Swiper bind:index={slideIndex} options={swiperOptions}>
    {#each [...Array(range).keys()] as num}
      <SwiperSlide>
        <div class="styleguide__slide">{num + 1}</div>
      </SwiperSlide>
    {/each}
  </Swiper>
  <p style="margin-top: 5px;">
    <Button variant="primary" bind:this={prev}>Prev</Button>
    <Button variant="primary" bind:this={next}>Next</Button>
  </p>
</Collapse>

<!-- <Swiper options={{ navigation: true }}>
  {#each [...Array(range).keys()] as num}
    <SwiperSlide>
      <div class="styleguide__slide">{num + 1}</div>
    </SwiperSlide>
  {/each}
</Swiper> -->

<br />

<input type="range" max="20" bind:value={range} style="width: 100%" />

<br /><br />

<p>
  <Button
    variant="primary"
    class="first second"
    onclick={() => (modalOpen = !modalOpen)}
    use={[[modalAction, 'modal-test']]}
  >
    Modal
  </Button>
  <a href="#button" use:modalAction={'modal-test'}>Modal by action</a>
  <svg use:modalAction={'modal-test'}>
    <text x="50" y="50">Modal by action on SVG</text>
  </svg>
</p>
<p>
  <Modal
    id="modal-test"
    class="some__modal"
    aria-labelledby="modal-title"
    aria-describedby="modal-description"
    bind:open={modalOpen}
    let:close
  >
    <h2 id="modal-title" class="mt-0 mb-4">Modal title</h2>
    <!-- <button
      type="button"
      on:click={() =>
        (collapsedClass =
          collapsedClass === 'collapsed' ? 'collapsed-class' : 'collapsed')}
      >Change collapsedClass</button
    > -->
    <!-- <Collapse id="modal-collapse" open> -->
    <div id="modal-description">
      <p class="mb-0">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam nemo
        possimus dolorum ducimus rerum tempora aut repudiandae necessitatibus
        adipisci, voluptatem, esse est? Alias ad error magni culpa at
        consectetur architecto magnam, deserunt dolorem doloribus sequi
        reiciendis laudantium sint laboriosam, delectus cum rerum quam totam
        sit. Sint culpa facilis doloribus accusamus voluptate omnis unde iste
        corrupti, harum architecto soluta enim velit aut minus sequi magni
        laborum quisquam esse cumque sapiente laboriosam nisi et quasi saepe!
        Quibusdam perferendis quo illum architecto fuga. Eius provident
        architecto nostrum, incidunt alias quis totam saepe deleniti nam tempore
        quidem natus quibusdam accusamus velit maiores fugiat! Pariatur?
      </p>
    </div>
    <!-- </Collapse> -->
    <div class="flex justify-end mt-4">
      <Button variant="primary" on:click={close}>Close modal</Button>
      <!-- <div>
        <label>
          <input type="radio" name="modal-radio" value="1" />
          One
        </label>
        <label>
          <input type="radio" name="modal-radio" value="2" />
          Two
        </label>
        <label>
          <input type="radio" name="modal-radio" value="3" />
          Three
        </label>
      </div> -->
    </div>
  </Modal>
</p>

<!-- <Swiper
  loop
  slidesPerView={3}
  spaceBetween={20}
  on:swiper={(e) => console.log('on:swiper', e.detail[0])}
>
  {#each [...Array(range).keys()] as num}
    <SwiperSlide>
      <div class="styleguide__slide">{num + 1}</div>
    </SwiperSlide>
  {/each}
</Swiper>

<hr /> -->

<p style="margin-bottom: 150px; display: flex; align-items: center; gap: 16px;">
  <Button variant="primary" on:click={() => (intersectOnce = !intersectOnce)}>
    Change intersect
  </Button>
  <span
    style="
      border-radius: 50%;
      display: inline-block;
      background-color: {intersected ? 'green' : 'red'};
      height: 38px;
      width: 38px;
    "
  />
  {intersected}
</p>

{#if $bp.lgUp}
  <div
    use:intersectAction={{ once: intersectOnce, threshold: 0.5 }}
    on:intersect={({ detail: { entry } }) => {
      intersected = entry.intersectionRatio >= 0.5
    }}
  >
    <img
      src="https://picsum.photos/id/354/1072/708"
      class={inputValue}
      alt="The bridge"
      width="1072"
      height="708"
      loading="lazy"
    />
  </div>
{/if}

<hr />

<div class="styleguide__gallery">
  <div class="styleguide__gallery-item">
    <img
      src="https://picsum.photos/id/237/1072/708"
      class="styleguide__gallery-img"
      alt="#"
      width="1072"
      height="708"
      loading="lazy"
    />
  </div>
  <div class="styleguide__gallery-item">
    <picture>
      <source
        media="(max-width: 575px)"
        srcset="https://picsum.photos/id/237/1072/708"
      />
      <source
        media="(max-width: 767px)"
        srcset="https://picsum.photos/id/1084/1072/708"
      />
      <img
        src="https://picsum.photos/id/866/1072/708"
        alt="#"
        class="styleguide__gallery-img"
        width="1072"
        height="708"
        loading="lazy"
      />
    </picture>
  </div>
  <div class="styleguide__gallery-item">
    <img
      src="https://picsum.photos/id/1032/1072/708"
      srcset="https://picsum.photos/id/237/200/132 200w,
      https://picsum.photos/id/1084/400/264 400w,
      https://picsum.photos/id/1018/600/396 600w,
      https://picsum.photos/id/354/800/528 800w,
      https://picsum.photos/id/1032/1072/708 1072w"
      sizes="(min-width: 520px) 33.333vw, (min-width: 350px) 50vw, 100vw"
      class="styleguide__gallery-img"
      alt="#"
      width="1072"
      height="708"
      loading="lazy"
    />
  </div>
  <div class="styleguide__gallery-item">
    <img
      src="https://picsum.photos/id/1032/1072/708"
      srcset="https://picsum.photos/id/237/1072/708 1.5x,
      https://picsum.photos/id/1084/1072/708 2x,
      https://picsum.photos/id/1018/1072/708 3x"
      class="styleguide__gallery-img"
      alt="#"
      width="1072"
      height="708"
      loading="lazy"
    />
  </div>
</div>

<input
  type="radio"
  bind:group={radio}
  value={1}
  onchange={(e) => console.log(e.target.checked)}
/>
<input type="radio" bind:group={radio} value={2} />
<input type="radio" bind:group={radio} value={3} />
{radio}

<!-- <Radio label="Radio 1" bind:group={radio} value={1} />
<Radio label="Radio 2" bind:group={radio} value={2} /> -->
<hr />

<input type="checkbox" bind:group={nativeGroup} value={1} />
<input
  type="checkbox"
  disabled={nativeGroup.includes(1)}
  bind:group={nativeGroup}
  value={2}
/>
<input type="checkbox" bind:group={nativeGroup} value={3} />
{nativeGroup}
<hr />

<div class="flex gap-4">
  <Radio label="Small" name="radio-demo" value="small" />
  <Radio label="Large" name="radio-demo" value="large" checked />
  <Radio label="Default" name="radio-demo" value="default" />

  <Radio
    aria-label="Default"
    name="radio-icon"
    value="one"
    style="--radio-size: 24px; --radio-checked-color: #f50057;"
  >
    <svg
      class="icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      slot="base"
      let:checked
    >
      {#if checked}
        <path
          d="m12 21.35-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        />
      {:else}
        <path
          d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"
        />
      {/if}
    </svg>
  </Radio>
  <Radio
    aria-label="Default"
    name="radio-icon"
    value="two"
    style="--radio-size: 24px;"
  >
    <svg
      class="icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      slot="base"
      let:checked
    >
      {#if checked}
        <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" />
      {:else}
        <path
          d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15-5-2.18L7 18V5h10v13z"
        />
      {/if}
    </svg>
  </Radio>
</div>

<hr />
<div class="flex items-center gap-2">
  {#each ['react', 'vue', 'svelte'] as item (item)}
    <Radio
      class="radio-tab"
      value={item}
      checked={item === 'react'}
      name="radio-control-tab"
    >
      <svelte:fragment slot="base">
        {item}
      </svelte:fragment>
    </Radio>
  {/each}
</div>

<hr />
<div class="flex items-center gap-4 mb-4">
  <Checkbox
    aria-label="Favourite"
    checked
    style="--checkbox-size: 24px; --checkbox-checked-color: #f50057;"
  >
    <svg
      class="icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      slot="base"
      let:checked
    >
      {#if checked}
        <path
          d="m12 21.35-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        />
      {:else}
        <path
          d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"
        />
      {/if}
    </svg>
  </Checkbox>
  <Checkbox aria-label="Bookmark" checked style="--checkbox-size: 24px;">
    <svg
      class="icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      slot="base"
      let:checked
    >
      {#if checked}
        <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" />
      {:else}
        <path
          d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15-5-2.18L7 18V5h10v13z"
        />
      {/if}
    </svg>
  </Checkbox>
  <Checkbox
    aria-label="Like"
    style="--checkbox-size: 24px;
    --checkbox-unchecked-color: rgb(3, 3, 3);
    --checkbox-checked-color: rgb(3, 3, 3)"
  >
    <svg
      class="icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      slot="base"
      let:checked
    >
      {#if checked}
        <path
          d="M3,11h3v10H3V11z M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11v10h10.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z"
        />
      {:else}
        <path
          d="M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z"
        />
      {/if}
    </svg>
  </Checkbox>

  <Checkbox class="checkbox-styled" aria-label="Checkbox styled" checked>
    <svg viewBox="0 0 24 24" slot="checked-icon">
      <path
        d="M 20.292969 5.2929688 L 9 16.585938 L 4.7070312 12.292969 L 3.2929688 13.707031 L 9 19.414062 L 21.707031 6.7070312 L 20.292969 5.2929688 z"
      />
    </svg>
  </Checkbox>
  <Checkbox
    class="checkbox-styled"
    aria-label="Checkbox styled"
    indeterminate
    disabled
  >
    <svg viewBox="0 0 24 24" slot="checked-icon">
      <path
        d="M 20.292969 5.2929688 L 9 16.585938 L 4.7070312 12.292969 L 3.2929688 13.707031 L 9 19.414062 L 21.707031 6.7070312 L 20.292969 5.2929688 z"
      />
    </svg>
  </Checkbox>
</div>
<div class="flex gap-4 mb-4">
  <Checkbox
    label="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
    checked
    style="max-width: 200px; margin-bottom: 8px;"
  />
  <Checkbox disabled checked let:disabled>
    Disabled <a href="#123" tabindex={disabled ? -1 : null}>Link</a>
  </Checkbox>
  <Checkbox label="Lorem ipsum, dolor." checked>
    <!-- <svg viewBox="0 0 14 10.59" slot="checked-icon">
      <path d="m5 10.42-5-5L1.41 4 5 7.59 12.59 0 14 1.42Z" />
    </svg> -->
  </Checkbox>
</div>
<div class="mb-2">
  <Checkbox
    label={allSelected ? 'Unselect All' : 'Select All'}
    checked={allSelected}
    disabled1
    {indeterminate}
    on:change={(e) => {
      selected = e.target.checked ? [...flavours] : []
    }}
  />
</div>
<ul class="grid gap-2 mb-2" style="padding-left: 25px;">
  {#each flavours as flavour (flavour)}
    <li>
      <Checkbox
        label={flavour}
        name="group[]"
        bind:group={selected}
        value={flavour}
      />
    </li>
  {/each}
</ul>

<div>Selected: <b>{JSON.stringify(selected)}</b></div>
<div>All Selected: <b>{allSelected}</b></div>
<div>Indeterminate: <b>{indeterminate}</b></div>
<!--{checked}-->
<!--{check}-->
<hr />

{JSON.stringify(group)}

<hr />

<Input
  label="Test input"
  bind:value={inputValue}
  placeholder="Some placeholder"
  data-test="test"
  on:input={onEvent}
/>
<br />
<FileInput bind:value={file} on:change={console.log} />
{inputValue}
{file}

<style lang="postcss" global>
  /* :root {
    --spacer: 16px;
  } */
  .grid {
    display: grid;
  }
  .flex {
    display: flex;
    flex-wrap: wrap;
  }
  .items-start {
    align-items: flex-start;
  }
  .items-center {
    align-items: center;
  }
  .justify-end {
    justify-content: flex-end;
  }
  .gap-0 {
    gap: 0;
  }
  .gap-1 {
    gap: 4px;
  }
  .gap-2 {
    gap: 8px;
  }
  .gap-4 {
    gap: 16px;
  }
  .mb-0 {
    margin-bottom: 0;
  }
  .mb-1 {
    margin-bottom: 4px;
  }
  .mb-2 {
    margin-bottom: 8px;
  }
  .mb-4 {
    margin-bottom: 16px;
  }
  .mt-0 {
    margin-top: 0;
  }
  .mt-1 {
    margin-top: 4px;
  }
  .mt-2 {
    margin-top: 8px;
  }
  .mt-4 {
    margin-top: 16px;
  }
  body {
    /* background: url(@/assets/img/34A3721C-53F0-4371-ABB9-F7CB9C94F053_w1200_r1.jpg); */
  }
  img {
    /*max-width: 100%;*/
  }
  .checkbox-styled.checkbox {
    --checkbox-size: 20px;

    .checkbox__icon {
      color: var(--checkbox-color);
    }
    &_checked .checkbox__icon {
      font-size: 25px;
      margin: -3px 0 0 3px;
    }
    &_checked .checkbox__box,
    &_indeterminate .checkbox__box {
      background-color: transparent;
      border-color: var(--checkbox-unchecked-color);
    }
    &_disabled .checkbox__box {
      border-color: var(--checkbox-disabled-color);
    }
  }

  .radio-tab.radio {
    .radio__base {
      display: block;
      padding: 6px 12px;
      border-radius: 4px;
      box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
        rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
      border: 1px solid #e2e8f0;
      color: #2d3748;
      font-size: 16px;
    }
    &_checked .radio__base {
      background-color: var(--theme-color);
      border-color: var(--theme-color);
      color: #ffffff;
    }
  }
</style>

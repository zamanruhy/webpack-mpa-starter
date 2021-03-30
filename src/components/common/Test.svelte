<script>
  import Input from './Input.svelte'
  import Checkbox from './Checkbox.svelte'
  import Switch from './Switch.svelte'
  import Radio from './Radio.svelte'
  import FileInput from './FileInput.svelte'
  import LazyImage from './LazyImage.svelte'
  import { Swiper, SwiperSlide } from './swiper'
  import Collapse from './Collapse.svelte'
  import Button from './Button.svelte'
  import { Tabs, TabList, Tab, TabPanel } from './tabs'
  import Icon from './Icon.svelte'
  import Modal from './Modal.svelte'
  import Range from './Range.svelte'
  import Field from './Field.svelte'
  import { mq } from '@/helpers/mq'
  import { collapse, modal, portal, intersect } from '@/actions'
  // import '@/assets/img/34A3721C-53F0-4371-ABB9-F7CB9C94F053_w1200_r1.jpg'

  let range = 5
  let inputValue = ''
  let checked = true
  let check = true
  let group = []
  let radio = 1
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
  let visible = true
  let tabsRange = 10
  let tabIndex = 8
  let iconsCount = 1
  let intersecting = false
  let modalVisible = false
  let modalInputValue = ''
  let prev
  let next
  const icons = [
    { name: 'house', img: false },
    { name: 'logo', img: true },
    { name: 'close', img: false },
    { name: 'lock', img: true }
  ]
  let buttonSize = ''
  let buttonHasIcon = true
  let buttonIcon = icons.find((i) => i.name === 'house')
  let buttonIconLeft = true
  let buttonLoading = false
  let buttonDisabled = false
  let buttonText = 'More icons more'
  let switched = true
  let values = [25, 75]

  $: step = switched ? 2 : 7
  $: swiperOptions = {
    navigation: {
      prevEl: prev && prev.el,
      nextEl: next && next.el
    },
    pagination: {},
    slidesPerView: 2,
    spaceBetween: 20,
    keyboard: true
  }

  function onEvent(e) {
    console.log(e)
  }
</script>

<Range {step} bind:values min={0} max={100} float />
<hr />
{JSON.stringify(values)}
<hr />
<Switch bind:checked={switched} label="Switch" />
{switched}
<hr />
<Field label="Size">
  <Radio bind:group={buttonSize} label="Small" value="small" />
  <Radio bind:group={buttonSize} label="Default" value="" />
  <Radio bind:group={buttonSize} label="Large" value="large" />
</Field>
<hr />
<Field label="Options">
  <Checkbox bind:checked={buttonHasIcon} label="Has icon" />
  <Checkbox
    bind:checked={buttonIconLeft}
    label="Icon left"
    disabled={!buttonHasIcon}
  />
  <Checkbox bind:checked={buttonLoading} label="Loading" />
  <Checkbox bind:checked={buttonDisabled} label="Disabled" />
</Field>
<hr />
<Field label="Button text" labelFor="form-blah">
  <Input bind:value={buttonText} id="form-blah" />
</Field>
<hr />
<Button
  variant="primary"
  size={buttonSize}
  loading={buttonLoading}
  disabled={buttonDisabled}
  on:click={() => iconsCount++}
>
  {#if buttonHasIcon && buttonIconLeft}
    <Icon {...buttonIcon} left={buttonIconLeft} />
  {/if}
  {buttonText}
  {#if buttonHasIcon && !buttonIconLeft}
    <Icon {...buttonIcon} right={!buttonIconLeft} />
  {/if}
</Button>
{#each [...Array(iconsCount).keys()] as num (num)}
  <p style="font-size: 30px">
    {#each icons as icon (icon.name)}
      <Icon
        {...icon}
        style="margin: 0"
        aria-hidden="true"
        on:click={() => (buttonIcon = icon)}
      />
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
    use={[[collapse, { id: 'test-collapse', class: 'collapsed-class' }]]}
  >
    <Icon name="house" left />
    Toogle
  </Button>
  {slideIndex}
</p>
<Collapse id="test-collapse" visible>
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

<br />

<input type="range" max="20" bind:value={range} style="width: 100%" />

<br /><br />

<p>
  <Button
    variant="primary"
    class="first second"
    on:click={() => (modalVisible = !modalVisible)}
  >
    Modal
  </Button>
</p>
<p>
  <Modal
    class="some__modal"
    style="margin: 0"
    aria-labelledby="modal-title"
    bind:visible={modalVisible}
    on:open={() => console.log('open')}
  >
    <h3 id="modal-title" style="margin-top: 0">Modal title</h3>
    <Input bind:value={modalInputValue} autofocus style="margin-bottom: 15px" />
    <Swiper
      bind:index={slideIndex}
      options={{ loop: true, navigation: true, pagination: true }}
    >
      {#each [...Array(range).keys()] as num}
        <SwiperSlide>
          <div class="styleguide__slide">{num + 1} {modalInputValue}</div>
        </SwiperSlide>
      {/each}
    </Swiper>
  </Modal>
</p>

{#if $mq.lgUp}
  <div style="overflow: hidden;">
    <LazyImage
      src="https://picsum.photos/id/354/1072/708"
      class={inputValue}
      alt="#"
      width="1072"
      height="708"
    />
  </div>
{/if}

<hr />

<div class="styleguide__gallery">
  <div class="styleguide__gallery-item">
    <LazyImage
      src="https://picsum.photos/id/237/1072/708"
      srcPlaceholder="https://picsum.photos/id/237/10/7"
      class="styleguide__gallery-img"
      alt="#"
      on:load={(e) => console.log(e)}
    />
  </div>
  <div class="styleguide__gallery-item">
    <LazyImage
      src="https://picsum.photos/id/866/1072/708"
      alt="#"
      class="styleguide__gallery-img"
      picture
    >
      <source
        media="(max-width: 575px)"
        srcset="https://picsum.photos/id/237/1072/708"
      />
      <source
        media="(max-width: 767px)"
        srcset="https://picsum.photos/id/1084/1072/708"
      />
    </LazyImage>
  </div>
  <div class="styleguide__gallery-item">
    <LazyImage
      src="https://picsum.photos/id/1032/1072/708"
      srcset="https://picsum.photos/id/237/200/132 200w,
      https://picsum.photos/id/1084/400/264 400w,
      https://picsum.photos/id/1018/600/396 600w,
      https://picsum.photos/id/354/800/528 800w,
      https://picsum.photos/id/1032/1072/708 1072w"
      sizes="(max-width: 767px) 33.333vw, 16.666vw"
      class="styleguide__gallery-img"
      alt="#"
    />
  </div>
  <div class="styleguide__gallery-item">
    <LazyImage
      src="https://picsum.photos/id/1032/1072/708"
      srcset="https://picsum.photos/id/237/1072/708 1.5x,
      https://picsum.photos/id/1084/1072/708 2x,
      https://picsum.photos/id/1018/1072/708 3x"
      class="styleguide__gallery-img"
      alt="#"
    />
  </div>
</div>

<!--<input type="radio" bind:group={radio} value={1}>-->
<!--<input type="radio" bind:group={radio} value={2}>-->
<!--<input type="radio" bind:group={radio} value={3}>-->

<!-- <Radio label="Radio 1" bind:group={radio} value={1} />
<Radio label="Radio 2" bind:group={radio} value={2} /> -->

<!-- <input type="checkbox" bind:checked={check} bind:group value={1} />
<input
  type="checkbox"
  bind:checked={check}
  bind:group
  value={2}
  bind:indeterminate
/> -->
<hr />
<div>
  <Checkbox
    label={allSelected ? 'Unselect All' : 'Select All'}
    checked={allSelected}
    {indeterminate}
    on:change={(e) => {
      selected = e.target.checked ? [...flavours] : []
    }}
  />
</div>
<ul style="padding-left: 25px; margin-bottom: 5px">
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
<Switch label="First" bind:group value={1} />
<Switch label="Second" bind:group value={2} />
<!-- <input type="checkbox" bind:group value={1} />
First
<input type="checkbox" bind:group checked value={2} />
Second -->
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

<style lang="scss" global>
  body {
    // background: url(@/assets/img/34A3721C-53F0-4371-ABB9-F7CB9C94F053_w1200_r1.jpg);
  }
  img {
    /*max-width: 100%;*/
  }
</style>

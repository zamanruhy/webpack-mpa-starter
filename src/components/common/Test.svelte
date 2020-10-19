<script>
  import Input from './Input.svelte'
  import Checkbox from './Checkbox.svelte'
  import Radio from './Radio.svelte'
  import FileInput from './FileInput.svelte'
  import LazyImage from './LazyImage.svelte'
  import { Swiper, SwiperSlide } from './swiper'
  import Collapse from './Collapse.svelte'
  import Button from './Button.svelte'
  import { Tabs, TabList, Tab, TabPanel } from './tabs'
  import Icon from './Icon.svelte'
  import Modal from './Modal.svelte'
  import { mq } from '@/helpers/mq'
  import { collapse, modal, portal, intersect } from '@/actions'

  let range = 5
  let value = ''
  let checked = true
  let check = true
  let group = [2]
  let radio = 1
  let file
  let slideIndex = 2
  let visible = true
  let tabsRange = 10
  let tabIndex = 8
  let iconsCount = 1
  let intersecting = false
  let modalVisible = false
  let prev
  let next

  $: swiperOptions = {
    navigation: {
      prevEl: prev && prev.el,
      nextEl: next && next.el
    },
    pagination: {},
    slidesPerView: 2,
    spaceBetween: 20
  }

  function onEvent(e) {
    console.log(e)
  }
</script>

<Button variant="primary" size="small" on:click={() => iconsCount++}>
  More Icons
</Button>
{#each [...Array(iconsCount).keys()] as num (num)}
  <p style="font-size: 30px">
    <Icon name="logo" img />
    <Icon name="house" class="block__element" />
    <Icon name="lock" img />
    <Icon name="close" />
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
  <Modal bind:visible={modalVisible}>
    <Swiper bind:index={slideIndex} options={{ loop: true, navigation: true }}>
      {#each [...Array(range).keys()] as num}
        <SwiperSlide>
          <div class="styleguide__slide">{num + 1}</div>
        </SwiperSlide>
      {/each}
    </Swiper>
  </Modal>
</p>

<input type="range" max="20" bind:value={range} style="width: 100%" />

<p>intersecting: {intersecting}</p>
{#if $mq.smUp && $mq.lgDown}
  <div style="overflow: hidden;">
    <LazyImage
      src="https://picsum.photos/id/354/1072/708"
      class={value}
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

<Radio label="Radio 1" bind:group={radio} value={1} />
<Radio label="Radio 2" bind:group={radio} value={2} />

<!--<input type="checkbox" bind:checked={check} bind:group={group} value={1}>-->
<!--<input type="checkbox" bind:checked={check} bind:group={group} value={range}>-->

<Checkbox label="Some label" name="first" bind:group value={1} />
<Checkbox label="Some label" name="second" bind:group value={2} />
{JSON.stringify(group)}
{JSON.stringify(radio)}
<!--{checked}-->
<!--{check}-->

<Input
  label="Test input"
  bind:value
  placeholder="Some placeholder"
  data-test="test"
  on:input={onEvent}
/>
<br />
<FileInput bind:value={file} on:change={console.log} />
{value}
{file}

<style lang="scss" global>
  img {
    /*max-width: 100%;*/
  }
</style>

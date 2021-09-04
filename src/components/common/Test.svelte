<script>
  import Input from './Input.svelte'
  import Checkbox from './Checkbox.svelte'
  import Switch from './Switch.svelte'
  import Radio from './Radio.svelte'
  import FileInput from './FileInput.svelte'
  import { Swiper, SwiperSlide } from './swiper'
  import Collapse from './Collapse.svelte'
  import Button from './Button.svelte'
  import { Tabs, TabList, Tab, TabPanel } from './tabs'
  import Icon from './Icon.svelte'
  import Modal from './Modal.svelte'
  import Drawer from './Drawer.svelte'
  import Range from './Range.svelte'
  import Field from './Field.svelte'
  import Spinner from './Spinner.svelte'
  // import VerticalRhythm from './VerticalRhythm.svelte'
  import { bp } from '@/helpers/bp'
  import { collapse, modal, portal, intersect, actions } from '@/actions'
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
  let values = [25, 75]
  let intersectOnce = false
  let intersected = false
  let placement = 'left'
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
  window.togglePlacement = () => {
    placement = placement === 'left' ? 'right' : 'left'
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
</script>

{#if lazyComp}
  {#await lazyComp}
    <Spinner size={36} width={2} />
  {:then { default: VerticalRhythm }}
    <VerticalRhythm />
  {:catch e}
    {e}
  {/await}
{:else}
  <Button variant="primary" on:click={loadComp}>Load</Button>
{/if}

<!-- {#each arrobj as obj (obj.id)}
  <Button
    variant="primary"
    style="display: flex"
    use={[[collapse, { id: obj.id }]]}
  >
    {obj.name}
  </Button>
  <Collapse id={obj.id} accordion="trigger" visible>
    {obj.text}
  </Collapse>
{/each} -->

<hr />

<Range {step} bind:values min={0} max={100} float />
<hr />
<div>{JSON.stringify(values)}</div>
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
<h6>Drawer</h6>
<Button
  variant="primary"
  on:click={() => {
    window.dispatchEvent(
      new window.CustomEvent('open-drawer', {
        detail: { id: 'content-drawer' }
      })
    )
  }}
>
  Open Drawer
</Button>
<Drawer id="content-drawer" {placement} let:close>
  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero, laboriosam
  deleniti? Ipsum aliquid maiores placeat iure obcaecati, accusamus cum, dolores
  sunt optio, quis voluptate similique perspiciatis! Laudantium aspernatur
  asperiores impedit necessitatibus, ex nulla tenetur. Qui ea repellendus sint
  ex illo recusandae dolorem laboriosam, ipsa deleniti! Incidunt doloribus
  distinctio ullam error dignissimos ad magnam ipsam sed? Dolorum temporibus
  dicta consequatur commodi est, reiciendis sunt deserunt odio non quam sapiente
  obcaecati eaque aliquid necessitatibus facere, ab, ratione magnam animi modi?
  Nam deleniti eligendi, reprehenderit consectetur exercitationem dignissimos,
  quas cumque odit amet error vel ipsum dolore. Assumenda amet ea,
  exercitationem quasi ab quibusdam.
  <footer>
    <button type="button" on:click={close}>Close</button>
  </footer>
</Drawer>

<hr />

<Button
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
    use={[[collapse, { id: 'test-collapse', class: 'collapsed-class' }]]}
  >
    <Icon data={houseIcon} style="margin-right: 4px;" />
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
    on:click={() => (modalVisible = !modalVisible)}
  >
    Modal
  </Button>
  <a href="#button" use:modal={'modal-test'}>Modal by action</a>
  <svg use:modal={'modal-test'}><text>Modal by action on SVG</text></svg>
</p>
<p>
  <Modal
    id="modal-test"
    class="some__modal"
    style="margin: 0"
    aria-labelledby="modal-title"
    noCloseOnBackdrop
    bind:visible={modalVisible}
    onopen={() => console.log('open')}
    let:close
  >
    <button
      href="#df"
      id="modal-title"
      style="margin-top: 0; cursor: pointer;"
      use:collapse={{ id: 'modal-collapse', class: collapsedClass }}
    >
      Modal title
    </button>
    <button
      type="button"
      on:click={() =>
        (collapsedClass =
          collapsedClass === 'collapsed' ? 'collapsed-class' : 'collapsed')}
      >Change collapsedClass</button
    >
    <Collapse id="modal-collapse" visible>
      <p style="margin: 0;">
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
    </Collapse>
    <footer style="margin-top: 16px; display: none1;">
      <button type="button" on:click={close}>Close</button>
      <div>
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
      </div>
    </footer>
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
  <Button variant="primary" on:click={() => (intersectOnce = !intersectOnce)}
    >Change intersect
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
    use:intersect={{ once: intersectOnce, threshold: 0.5 }}
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

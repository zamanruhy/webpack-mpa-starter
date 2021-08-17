<script>
  // import { spring } from 'svelte/motion'
  // import RangePips from './RangePips.svelte'
  import { objectToStyle } from '@/utils'

  // range slider props
  export let min = 0
  export let max = 100
  export let step = 1
  export let values = (max + min) / 2
  export let vertical = false
  export let float = false
  export let hover = true

  // range pips / values props
  // export let pips = false
  // export let pipstep = undefined
  // export let all = undefined
  // export let first = undefined
  // export let last = undefined
  // export let rest = undefined

  // formatting props
  // export let id = undefined
  export let formatter = (v) => v
  export let handleFormatter = formatter

  // stylistic props
  // export let precision = 2

  // dom references
  let sliderEl

  // state management
  let focus = false
  let handleActivated = false
  let handlePressed = false
  let keyboardActive = false
  let activeHandle = values.length - 1

  // watch the values array, and trim / clamp the values to the steps
  // and boundaries set up in the slider on change
  $: values = [].concat(values).slice(0, 2).map(alignToStep)

  $: single = values.length === 1

  $: percentOf = (val) => {
    const perc = ((val - min) / (max - min)) * 100
    return perc > 100 ? 100 : perc < 0 ? 0 : round(perc, 4)
  }

  $: clamp = (val) => {
    return val < min ? min : val > max ? max : val
  }

  $: precision = Math.max(...[min, step].map(getPrecision))

  $: alignToStep = (val) => {
    if (val <= min) {
      return min
    } else if (val >= max) {
      return max
    }

    const remainder = (val - min) % step
    let aligned = val - remainder

    if (Math.abs(remainder) * 2 >= step) {
      aligned += remainder > 0 ? step : -step
    }

    aligned = clamp(aligned)

    return round(aligned, precision)
  }

  $: trackStyle = objectToStyle({
    [vertical ? 'top' : 'left']: single ? 0 : percentOf(values[0]) + '%',
    [vertical ? 'bottom' : 'right']:
      100 - percentOf(values[single ? 0 : 1]) + '%'
  })

  $: thumbStyle = (i) =>
    objectToStyle({
      [vertical ? 'top' : 'left']: percentOf(values[i]) + '%',
      zIndex: activeHandle === i ? 2 : 1
    })

  function round(val, p = 0) {
    const m = 10 ** p
    return Math.round(val * m) / m
  }

  function getPrecision(a) {
    if (!isFinite(a)) return 0
    let e = 1
    let p = 0
    while (Math.round(a * e) / e !== a) {
      e *= 10
      p++
    }
    return p
  }

  /**
   * helper func to get the index of an element in it's DOM container
   * @param {object} el dom object reference we want the index of
   * @returns {number} the index of the input element
   **/
  function index(el) {
    if (!el) return -1
    var i = 0
    while ((el = el.previousElementSibling)) {
      i++
    }
    return i
  }

  /**
   * noramlise a mouse or touch event to return the
   * client (x/y) object for that event
   * @param {event} e a mouse/touch event to normalise
   * @returns {object} normalised event client object (x,y)
   **/
  function normalisedClient(e) {
    if (e.type.includes('touch')) {
      return e.touches[0]
    } else {
      return e
    }
  }

  /**
   * get the position (x/y) of a mouse/touch event on the screen
   * @param {event} e a mouse/touch event
   * @returns {object} position on screen (x,y)
   **/
  function eventPosition(e) {
    // console.log(e.type, e.currentTarget, normalisedClient(e).clientX)
    return vertical ? normalisedClient(e).clientY : normalisedClient(e).clientX
  }

  /**
   * check if an element is a handle on the slider
   * @param {object} el dom object reference we want to check
   * @returns {boolean}
   **/
  function targetIsHandle(el) {
    const handles = sliderEl.querySelectorAll('.handle')
    const isHandle = Array.prototype.includes.call(handles, el)
    const isChild = Array.prototype.some.call(handles, (e) => e.contains(el))
    return isHandle || isChild
  }

  /**
   * helper to return the slider dimensions for finding
   * the closest handle to user interaction
   * @return {object} the range slider DOM client rect
   **/
  // function getSliderDimensions() {
  //   return sliderEl.getBoundingClientRect()
  // }

  /**
   * helper to return closest handle to user interaction
   * @param {number} clientPos the pixel (clientX/Y) to check against
   * @return {number} the index of the closest handle to clientPos
   **/
  function getClosestHandle(clientPos) {
    const rect = sliderEl.getBoundingClientRect()
    const pos = clientPos - (vertical ? rect.top : rect.left)
    const ratio = pos / (vertical ? rect.height : rect.width)
    const val = (max - min) * ratio + min

    if (single) {
      return 0
    } else if (values[0] === values[1]) {
      return val > values[1] ? 1 : 0
    } else {
      return Math.abs(val - values[0]) < Math.abs(val - values[1]) ? 0 : 1
    }
  }

  /**
   * take the interaction position on the slider, convert
   * it to a value on the range, and then send that value
   * through to the moveHandle() method to set the active
   * handle's position
   * @param {number} clientPos the clientX/Y of the interaction
   **/
  function handleInteract(clientPos) {
    // first make sure we have the latest dimensions
    // of the slider, as it may have changed size
    const rect = sliderEl.getBoundingClientRect()
    // calculate the interaction position, ratio and value
    const pos = clientPos - (vertical ? rect.top : rect.left)
    const ratio = pos / (vertical ? rect.height : rect.width)
    const val = (max - min) * ratio + min
    // move handle to the value
    moveHandle(activeHandle, val)
  }

  /**
   * move a handle to a specific value, respecting the clamp/align rules
   * @param {number} index the index of the handle we want to move
   * @param {number} value the value to move the handle to
   * @return {number} the value that was moved to (after alignment/clamping)
   **/
  function moveHandle(index, value) {
    if (index === 0 && value > values[1]) {
      values[1] = value
      // index = activeHandle = 1
    } else if (index === 1 && value < values[0]) {
      values[0] = value
      // index = activeHandle = 0
    }

    // set the value for the handle, and align/clamp it
    values[index] = value
  }

  /**
   * when the user has unfocussed (blurred) from the
   * slider, deactivated all handles
   * @param {event} e the event from browser
   **/
  function sliderBlurHandle(e) {
    if (keyboardActive) {
      focus = false
      handleActivated = false
      handlePressed = false
    }
  }

  /**
   * when the user focusses the handle of a slider
   * set it to be active
   * @param {event} e the event from browser
   **/
  function sliderFocusHandle(e) {
    // activeHandle = index(e.target)
    focus = true
  }

  /**
   * handle the keyboard accessible features by checking the
   * input type, and modfier key then moving handle by appropriate amount
   * @param {event} e the event from browser
   **/
  function onKeydown(e, i) {
    let add = e.ctrlKey || e.metaKey || e.shiftKey ? step * 10 : step

    switch (e.key) {
      case 'PageUp':
        add *= 10
      case 'Right':
      case 'Up':
      case 'ArrowRight':
      case 'ArrowUp':
        moveHandle(i, values[i] + add)
        e.preventDefault()
        break
      case 'PageDown':
        add *= 10
      case 'Left':
      case 'Down':
      case 'ArrowLeft':
      case 'ArrowDown':
        moveHandle(i, values[i] - add)
        e.preventDefault()
        break
      case 'Home':
        moveHandle(i, min)
        e.preventDefault()
        break
      case 'End':
        moveHandle(i, max)
        e.preventDefault()
        break
    }
  }

  /**
   * function to run when the user touches
   * down on the slider element anywhere
   * @param {event} e the event from browser
   **/
  function sliderInteractStart(e) {
    const p = eventPosition(e)
    // set the closest handle as active
    focus = true
    handleActivated = true
    handlePressed = true
    activeHandle = getClosestHandle(p)
    // for touch devices we want the handle to instantly
    // move to the position touched for more responsive feeling
    // if (e.type === 'touchstart') {
    handleInteract(p)
    // }
  }

  /**
   * function to run when the user stops touching
   * down on the slider element anywhere
   * @param {event} e the event from browser
   **/
  function sliderInteractEnd(e) {
    handlePressed = false
  }

  /**
   * unfocus the slider if the user clicked off of
   * it, somewhere else on the screen
   * @param {event} e the event from browser
   **/
  function bodyInteractStart(e) {
    keyboardActive = false
    if (focus && e.target !== sliderEl && !sliderEl.contains(e.target)) {
      focus = false
    }
  }

  /**
   * send the clientX through to handle the interaction
   * whenever the user moves acros screen while active
   * @param {event} e the event from browser
   **/
  function bodyInteract(e) {
    if (handleActivated) {
      handleInteract(eventPosition(e))
    }
  }

  /**
   * if user triggers mouseup on the body while
   * a handle is active (without moving) then we
   * trigger an interact event there
   * @param {event} e the event from browser
   **/
  function bodyMouseUp(e) {
    const el = e.target
    // this only works if a handle is active, which can
    // only happen if there was sliderInteractStart triggered
    // on the slider, already
    if (handleActivated && (el === sliderEl || sliderEl.contains(el))) {
      focus = true
      if (!targetIsHandle(el)) {
        handleInteract(eventPosition(e))
      }
    }
    handleActivated = false
    handlePressed = false
  }

  /**
   * if user triggers touchend on the body then we
   * defocus the slider completely
   * @param {event} e the event from browser
   **/
  function bodyTouchEnd(e) {
    handleActivated = false
    handlePressed = false
  }

  function bodyKeyDown(e) {
    if (e.target === sliderEl || sliderEl.contains(e.target)) {
      keyboardActive = true
    }
  }
</script>

<div>{activeHandle}</div>
<div
  class="range"
  class:range_vertical={vertical}
  bind:this={sliderEl}
  on:touchstart|preventDefault={sliderInteractStart}
  on:mousedown|preventDefault={sliderInteractStart}
  on:touchend={sliderInteractEnd}
  on:mouseup={sliderInteractEnd}
>
  <div class="range__container">
    <div class="range__rail" />
    <div class="range__track" style={trackStyle} />
    <!-- marks -->
    {#each values as value, index}
      <div
        class="range__thumb"
        role="slider"
        tabindex="0"
        class:hoverable={hover}
        class:active={focus && activeHandle === index}
        class:press={handlePressed && activeHandle === index}
        on:blur={sliderBlurHandle}
        on:focus={sliderFocusHandle}
        on:keydown={(e) => onKeydown(e, index)}
        style={thumbStyle(index)}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={handleFormatter(value)}
        aria-orientation={vertical ? 'vertical' : 'horizontal'}
      >
        <span class="rangeNub" />
        {#if float}<span class="rangeFloat">{handleFormatter(value)}</span>{/if}
      </div>
    {/each}

    <!-- {#if pips}
      <div
        {values}
        {min}
        {max}
        {step}
        {range}
        {vertical}
        {all}
        {first}
        {last}
        {rest}
        {pipstep}
        {prefix}
        {suffix}
        {formatter}
        {focus}
        {percentOf}
      />
    {/if} -->
  </div>
</div>

<svelte:window
  on:mousedown={bodyInteractStart}
  on:touchstart={bodyInteractStart}
  on:mousemove={bodyInteract}
  on:touchmove={bodyInteract}
  on:mouseup={bodyMouseUp}
  on:touchend={bodyTouchEnd}
  on:keydown={bodyKeyDown}
/>

<style lang="scss" global>
  @use "sass:math";

  $range-thumb-size: 20px;
  $range-thumb-margin: math.div($range-thumb-size, -2);

  .range {
    min-height: 24px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;

    &__container {
      height: 4px;
      position: relative;
      border-radius: 3px;
    }
    &__rail {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: inherit;
      background-color: $color-primary;
      opacity: 0.38;
    }
    &__track {
      position: absolute;
      height: 100%;
      border-radius: inherit;
      background-color: $color-primary;
    }
    &__thumb {
      position: absolute;
      top: 50%;
      left: 0;
      width: $range-thumb-size;
      height: $range-thumb-size;
      margin: $range-thumb-margin 0 0 $range-thumb-margin;
      background-color: $color-primary;
      border-radius: 50%;
    }
  }
  // .rangeSlider {
  //   --slider: var(--range-slider, #d7dada);
  //   --handle-inactive: var(--range-handle-inactive, #99a2a2);
  //   --handle: var(--range-handle, #838de7);
  //   --handle-focus: var(--range-handle-focus, #4a40d4);
  //   --handle-border: var(--range-handle-border, var(--handle));
  //   --range-inactive: var(--range-range-inactive, var(--handle-inactive));
  //   --range: var(--range-range, var(--handle-focus));
  //   --float-inactive: var(--range-float-inactive, var(--handle-inactive));
  //   --float: var(--range-float, var(--handle-focus));
  //   --float-text: var(--range-float-text, white);
  // }
  // .rangeSlider {
  //   position: relative;
  //   border-radius: 100px;
  //   height: 0.5em;
  //   margin: 1em;
  // }
  // .rangeSlider,
  // .rangeSlider * {
  //   user-select: none;
  // }
  // .rangeSlider.pips {
  //   margin-bottom: 1.8em;
  // }
  // .rangeSlider.pip-labels {
  //   margin-bottom: 2.8em;
  // }
  // .rangeSlider.vertical {
  //   display: inline-block;
  //   border-radius: 100px;
  //   width: 0.5em;
  //   min-height: 200px;
  // }
  // .rangeSlider.vertical.pips {
  //   margin-right: 1.8em;
  //   margin-bottom: 1em;
  // }
  // .rangeSlider.vertical.pip-labels {
  //   margin-right: 2.8em;
  //   margin-bottom: 1em;
  // }
  // .rangeSlider .rangeHandle {
  //   position: absolute;
  //   display: block;
  //   height: 1.4em;
  //   width: 1.4em;
  //   top: 0.25em;
  //   left: 0.25em;
  //   transform: translateY(-50%) translateX(-50%);
  //   z-index: 2;
  // }
  // .rangeSlider .rangeNub,
  // .rangeSlider .rangeHandle:before {
  //   position: absolute;
  //   left: 0;
  //   top: 0;
  //   display: block;
  //   border-radius: 10em;
  //   height: 100%;
  //   width: 100%;
  //   transition: all 0.2s ease;
  // }
  // .rangeSlider .rangeHandle:before {
  //   content: '';
  //   left: 1px;
  //   top: 1px;
  //   bottom: 1px;
  //   right: 1px;
  //   height: auto;
  //   width: auto;
  //   box-shadow: 0 0 0 0px var(--handle-border);
  //   opacity: 0;
  // }
  // .rangeSlider .rangeHandle.hoverable:hover:before {
  //   box-shadow: 0 0 0 8px var(--handle-border);
  //   opacity: 0.2;
  // }
  // .rangeSlider .rangeHandle.hoverable.press:before,
  // .rangeSlider .rangeHandle.hoverable.press:hover:before {
  //   box-shadow: 0 0 0 12px var(--handle-border);
  //   opacity: 0.4;
  // }
  // .rangeSlider.range:not(.min):not(.max) .rangeNub {
  //   // border-radius: 10em 10em 10em 1.6em;
  // }
  // .rangeSlider.range .rangeHandle:nth-of-type(1) .rangeNub {
  //   transform: rotate(-135deg);
  // }
  // .rangeSlider.range .rangeHandle:nth-of-type(2) .rangeNub {
  //   transform: rotate(45deg);
  // }
  // .rangeSlider.range.vertical .rangeHandle:nth-of-type(1) .rangeNub {
  //   transform: rotate(-45deg);
  // }
  // .rangeSlider.range.vertical .rangeHandle:nth-of-type(2) .rangeNub {
  //   transform: rotate(135deg);
  // }
  // .rangeSlider .rangeFloat {
  //   display: block;
  //   position: absolute;
  //   left: 50%;
  //   top: -0.5em;
  //   transform: translate(-50%, -100%);
  //   font-size: 1em;
  //   text-align: center;
  //   opacity: 0;
  //   // pointer-events: none;
  //   white-space: nowrap;
  //   transition: all 0.2s ease;
  //   font-size: 0.9em;
  //   padding: 0.2em 0.4em;
  //   border-radius: 0.2em;
  // }
  // .rangeSlider .rangeHandle.active .rangeFloat,
  // .rangeSlider .rangeHandle.hoverable:hover .rangeFloat {
  //   opacity: 1;
  //   top: -0.2em;
  //   transform: translate(-50%, -100%);
  // }
  // .rangeSlider .rangeBar {
  //   position: absolute;
  //   display: block;
  //   transition: background 0.2s ease;
  //   border-radius: 1em;
  //   height: 0.5em;
  //   top: 0;
  //   user-select: none;
  //   z-index: 1;
  // }
  // .rangeSlider.vertical .rangeBar {
  //   width: 0.5em;
  //   height: auto;
  // }
  // .rangeSlider {
  //   background-color: #d7dada;
  //   background-color: var(--slider);
  // }
  // .rangeSlider .rangeBar {
  //   background-color: #99a2a2;
  //   background-color: var(--range-inactive);
  // }
  // .rangeSlider.focus .rangeBar {
  //   background-color: #838de7;
  //   background-color: var(--range);
  // }
  // .rangeSlider .rangeNub {
  //   background-color: #99a2a2;
  //   background-color: var(--handle-inactive);
  // }
  // .rangeSlider.focus .rangeNub {
  //   background-color: #838de7;
  //   background-color: var(--handle);
  // }
  // .rangeSlider .rangeHandle.active .rangeNub {
  //   background-color: #4a40d4;
  //   background-color: var(--handle-focus);
  // }
  // .rangeSlider .rangeFloat {
  //   color: white;
  //   color: var(--float-text);
  //   background-color: #99a2a2;
  //   background-color: var(--float-inactive);
  // }
  // .rangeSlider.focus .rangeFloat {
  //   background-color: #4a40d4;
  //   background-color: var(--float);
  // }
</style>

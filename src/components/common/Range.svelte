<svelte:options immutable />

<script>
  import { createEventDispatcher } from 'svelte'
  import { focusVisibleAction } from '@/actions'

  let className = ''
  export { className as class }
  export let min = 0
  export let max = 100
  export let step = 1
  export let value = (max + min) / 2 // number | Array<number>
  export let vertical = false
  export let disabled = false
  export let reversed = false
  export let name = null
  export let marks = false // bool | array
  export let track = 'normal' // 'normal' | false | 'inverted'
  export let tooltipDisplay = 'auto' // 'always' |'auto' | 'never'
  export let tooltipFormat = (v) => v
  export let scale = (x) => x
  export let getAriaLabel = null
  export let getAriaValueText = null

  let el
  let thumbEls = []
  let pressed = false
  let dragging = false
  let focusVisibleIndex = -1
  let activeIndex = -1
  let hoveredIndex = -1
  let moveCount = 0
  const dispatch = createEventDispatcher()

  $: values = [].concat(value).sort((a, b) => a - b)

  $: values = values.map(constrainValue)

  $: single = values.length === 1

  $: emitValue(values)

  $: percentOf = (val) => round(((val - min) / (max - min)) * 100, 4)

  $: precision =
    step !== null ? Math.max(...[min, max, step].map(getPrecision)) : 0

  $: constrainValue = (val) => {
    if (val >= max) return max
    if (val <= min) return min
    if (step !== null) {
      let constrained = Math.round((val - min) / step) * step + min
      constrained = Math.min(Math.max(constrained, min), max)
      return round(constrained, precision)
    } else {
      return marks.reduce((a, b) => {
        return Math.abs(b.value - val) < Math.abs(a.value - val) ? b : a
      }).value
    }
  }

  $: side =
    (vertical && reversed && 'top') ||
    (vertical && 'bottom') ||
    (reversed && 'right') ||
    'left'

  $: trackStyle = `
      ${side}: ${percentOf(single ? min : values[0])}%;
      ${vertical ? 'height' : 'width'}: ${
    percentOf(values[values.length - 1]) - percentOf(single ? min : values[0])
  }%;
  `
    .replace(/\s+/g, ' ')
    .trim()

  $: thumbStyle = (i) => `${side}: ${percentOf(values[i])}%;`

  $: markStyle = (val) => `${side}: ${percentOf(val)}%;`

  $: classes = [
    'range',
    vertical && 'range_vertical',
    reversed && 'range_reversed',
    disabled && 'range_disabled',
    dragging && 'range_dragging',
    track === 'inverted' && 'range_track-inverted',
    labelledMarks.length && 'range_marked',
    className
  ]
    .filter(Boolean)
    .join(' ')

  $: ({
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-valuetext': ariaValuetext,
    ...restProps
  } = $$restProps)

  $: computedMarks =
    marks === true && step !== null
      ? [...Array(Math.floor((max - min) / step) + 1)].map((_, k) => ({
          value: round(min + step * k, precision)
        }))
      : marks || []

  $: labelledMarks = computedMarks.filter((m) => m.label)

  $: isActiveMark = (val) => {
    if (track === false) {
      return values.includes(val)
    }
    if (track === 'inverted') {
      return single
        ? val >= values[0]
        : val <= values[0] || val >= values[values.length - 1]
    }
    return single
      ? val <= values[0]
      : val >= values[0] && val <= values[values.length - 1]
  }

  $: if (!pressed) {
    activeIndex = focusVisibleIndex
  }

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

  function emitValue(vals) {
    const val = single ? vals[0] : [...vals]
    if (String(value) !== String(val)) {
      value = val
      dispatch('update', { value: val, activeIndex })
    }
  }

  function setValues(i, val) {
    values = values.map((v, k) => {
      if ((v < val && k > i) || (v > val && k < i) || i === k) {
        return val
      }
      return v
    })
  }

  function toSiblingStep(i, dir) {
    if (step !== null) {
      setValues(i, values[i] + step * dir)
    } else {
      const vals = marks.map((m) => m.value)
      let ind = vals.indexOf(values[i])
      ind = Math.min(Math.max(ind + dir, 0), vals.length - 1)
      setValues(i, vals[ind])
    }
  }

  function onThumbKeydown(e, i) {
    const key = e.key
    const lessArrows = [
      reversed && vertical ? 'ArrowUp' : 'ArrowDown',
      reversed && !vertical ? 'ArrowRight' : 'ArrowLeft'
    ]
    const moreArrows = [
      lessArrows[0] === 'ArrowUp' ? 'ArrowDown' : 'ArrowUp',
      lessArrows[1] === 'ArrowRight' ? 'ArrowLeft' : 'ArrowRight'
    ]
    if (lessArrows.includes(key)) {
      toSiblingStep(i, -1)
      e.preventDefault()
    } else if (moreArrows.includes(key)) {
      toSiblingStep(i, 1)
      e.preventDefault()
    } else if (key === 'Home') {
      setValues(i, min)
      e.preventDefault()
    } else if (key === 'End') {
      setValues(i, max)
      e.preventDefault()
    }
  }

  function posToVal({ clientX, clientY }) {
    const { width, height, bottom, left } = el.getBoundingClientRect()
    const pos = vertical ? bottom - clientY : clientX - left
    let ratio = pos / (vertical ? height : width)
    ratio = reversed ? 1 - ratio : ratio
    return (max - min) * ratio + min
  }

  function getClosestIndex(e) {
    if (single) return 0

    const val = posToVal(e)

    const { index } = values.reduce((acc, v, i) => {
      const d = Math.abs(val - v)
      if (i === 0 || d < acc.d || (d === acc.d && val > v)) {
        return { d, index: i }
      }
      return acc
    }, null)

    return index
  }

  function handleInteract(e) {
    setValues(activeIndex, posToVal(e))
  }

  function onPointerdown(e) {
    moveCount = 0

    if (e.pointerType === 'mouse' && e.button !== 0) {
      return
    }

    pressed = true
    activeIndex = getClosestIndex(e)
    el.setPointerCapture(e.pointerId)
    handleInteract(e)
    thumbEls[activeIndex].focus()
  }

  function onPointermove(e) {
    moveCount += 1

    if (!dragging && moveCount > 2) {
      dragging = true
    }

    handleInteract(e)
  }

  function onPointerup() {
    pressed = false
    dragging = false
    activeIndex = -1
  }
</script>

<div
  class={classes}
  {...restProps}
  bind:this={el}
  on:pointerdown|preventDefault={onPointerdown}
  on:pointermove|preventDefault={pressed && onPointermove}
  on:pointerup|preventDefault={pressed && onPointerup}
>
  <div class="range__base">
    <div class="range__rail" />
    {#if track !== false}
      <div class="range__track" style={trackStyle} />
    {/if}
    {#each values as value, i (i)}
      <input type="hidden" {name} {value} {disabled} />
    {/each}
    {#if computedMarks.length}
      <div class="range__marks">
        {#each computedMarks as mark (mark.value)}
          <div
            class="range__mark"
            class:range__mark_active={isActiveMark(mark.value)}
            style={markStyle(mark.value)}
          />
        {/each}
      </div>
    {/if}
    {#if labelledMarks.length}
      <div class="range__mark-labels">
        {#each labelledMarks as mark (mark.value)}
          <div
            class="range__mark-label"
            class:range__mark-label_active={isActiveMark(mark.value)}
            style={markStyle(mark.value)}
            aria-hidden="true"
          >
            {mark.label}
          </div>
        {/each}
      </div>
    {/if}
    {#each values as value, i (i)}
      <div
        class="range__handle"
        class:range__handle_focus-visible={focusVisibleIndex === i}
        class:range__handle_pressed={activeIndex === i && pressed}
        class:range__handle_active={activeIndex === i}
        class:range__handle_open={tooltipDisplay !== 'never' &&
          (tooltipDisplay === 'always' ||
            activeIndex === i ||
            hoveredIndex === i)}
        role="slider"
        tabindex={disabled ? null : 0}
        style={thumbStyle(i)}
        aria-orientation={vertical ? 'vertical' : 'horizontal'}
        aria-valuemin={scale(min)}
        aria-valuemax={scale(max)}
        aria-valuenow={scale(value)}
        aria-valuetext={getAriaValueText?.(scale(value), i) || ariaValuetext}
        aria-label={getAriaLabel?.(i) || ariaLabel}
        aria-labelledby={ariaLabelledby}
        use:focusVisibleAction={(v) => (focusVisibleIndex = v ? i : -1)}
        bind:this={thumbEls[i]}
        on:keydown={(e) => onThumbKeydown(e, i)}
        on:pointerenter={() => (hoveredIndex = i)}
        on:pointerleave={() => (hoveredIndex = -1)}
      >
        <div class="range__thumb">
          <slot name="thumb" index={i} />
        </div>
        {#if tooltipDisplay !== 'never'}
          <div class="range__tooltip" aria-hidden="true">
            <slot name="tooltip" value={scale(value)} index={i}>
              <div class="range__tooltip-value">
                {tooltipFormat(scale(value), i)}
              </div>
              <div class="range__tooltip-arrow" />
            </slot>
          </div>
        {/if}
      </div>
    {/each}
  </div>
</div>

<style lang="postcss" global>
  $range-outer-size: 32px;
  $range-margin: 24px;
  $range-size: 4px;
  $range-color: var(--accent-color, var(--color-theme, darkcyan));
  $range-disabled-color: hsl(214 20% 74%);
  $range-transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  $range-rail-color: hsl(214 32% 87%);
  $range-rail-disabled-color: hsl(214 29% 89%);
  $range-track-size: 100%;
  $range-thumb-size: 18px;
  $range-thumb-color: var(--range-color, $range-color);
  $range-thumb-disabled-color: var(
    --range-disabled-color,
    $range-disabled-color
  );
  $range-tooltip-color: hsl(218 23% 23%);
  $range-tooltip-text-color: hsl(0 0% 100%);
  $range-mark-size: 100%;
  $range-mark-thickness: 2px;
  $range-mark-offset: 0px;
  $range-mark-label-offset: 20px;
  $range-mark-color: hsl(214 32% 74%);
  $range-mark-active-color: hsl(0 0% 100% / 64%);
  $range-mark-label-color: hsl(218 23% 23% / 70%);
  $range-mark-label-active-color: hsl(218 23% 23%);

  .range {
    height: var(--range-outer-size, $range-outer-size);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    touch-action: none;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    color: var(--range-color, $range-color);

    &_disabled {
      color: var(--range-disabled-color, $range-disabled-color);
    }

    &_vertical {
      width: var(--range-outer-size, $range-outer-size);
      height: 100%;
    }

    &_marked {
      margin-bottom: var(--range-margin, $range-margin);
    }
    &_vertical&_marked {
      margin-right: var(--range-margin, $range-margin);
      margin-bottom: auto;
    }

    &_disabled {
      cursor: default;
      pointer-events: none;
    }

    &__base {
      height: var(--range-size, $range-size);
      position: relative;
      border-radius: 1px;
      width: 100%;
    }
    &_vertical &__base {
      width: var(--range-size, $range-size);
      height: 100%;
    }
    &__rail {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: inherit;
      background-color: var(--range-rail-color, $range-rail-color);
    }
    &_disabled &__rail {
      background-color: var(
        --range-rail-disabled-color,
        $range-rail-disabled-color
      );
    }
    &_track-inverted &__rail {
      background-color: var(--range-color, $range-color);
    }
    &_disabled&_track-inverted &__rail {
      background-color: var(--range-disabled-color, $range-disabled-color);
    }
    &__track {
      position: absolute;
      height: var(--range-track-size, $range-track-size);
      border-radius: inherit;
      background-color: var(--range-color, $range-color);
      top: 50%;
      transform: translateY(-50%);
      transition: var(--range-transition, $range-transition);
      transition-property: left, right, top, bottom, width, height;
    }
    &_vertical &__track {
      width: var(--range-track-size, $range-track-size);
      height: auto;
      top: auto;
      left: 50%;
      transform: translateX(-50%);
    }
    &_disabled &__track {
      background-color: var(--range-disabled-color, $range-disabled-color);
    }
    &_track-inverted &__track {
      background-color: var(--range-rail-color, $range-rail-color);
    }
    &_disabled&_track-inverted &__rail {
      background-color: var(
        --range-rail-disabled-color,
        $range-rail-disabled-color
      );
    }
    &_dragging &__track {
      transition: none;
    }
    &__handle {
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      outline: 0;
      display: flex;
      z-index: 1;
      transition: var(--range-transition, $range-transition);
      transition-property: left, right, top, bottom;
      isolation: isolate;

      &_active {
        z-index: 2;
      }

      &::before {
        content: '';
        position: absolute;
        width: 42px;
        height: 42px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: inherit;
      }
    }
    &_reversed &__handle {
      transform: translate(50%, -50%);
    }
    &_vertical &__handle {
      transform: translate(-50%, 50%);
      left: 50%;
      top: auto;
    }
    &_reversed&_vertical &__handle {
      transform: translate(-50%, -50%);
    }
    &_dragging &__handle {
      transition: none;
    }
    &__thumb {
      width: var(--range-thumb-size, $range-thumb-size);
      height: var(--range-thumb-size, $range-thumb-size);
      background-color: var(--range-thumb-color, $range-thumb-color);
      transition: transform var(--range-transition, $range-transition);
      border-radius: inherit;
    }
    &__handle_active &__thumb {
      transform: scale(1.15);
    }
    &_disabled &__thumb {
      background-color: var(
        --range-thumb-disabled-color,
        $range-thumb-disabled-color
      );
    }
    &__tooltip {
      position: absolute;
      bottom: 100%;
      display: flex;
      flex-direction: column;
      left: 50%;
      padding-bottom: 6px;
      transition: var(--range-transition, $range-transition);
      transition-property: transform, opacity, visibility;
      transform-origin: center bottom;
      transform: translateX(-50%) translateY(5px);
      opacity: 0;
      visibility: hidden;
    }
    &__handle_open &__tooltip {
      transform: translateX(-50%);
      opacity: 1;
      visibility: visible;
    }
    &__tooltip-value {
      align-self: center;
      padding: 4px 12px;
      border-radius: 2px;
      background-color: var(--range-tooltip-color, $range-tooltip-color);
      color: var(--range-tooltip-text-color, $range-tooltip-text-color);
      font-size: 14px;
      white-space: nowrap;
      min-width: 30px;
      text-align: center;
      display: flex;
      justify-content: center;
    }
    &__tooltip-arrow {
      width: 14px;
      height: 7px;
      background-color: var(--range-tooltip-color, $range-tooltip-color);
      clip-path: polygon(0 0, 100% 0, 50% 100%);
      margin-top: -1px;
      align-self: center;
    }
    &__marks {
    }
    &__mark {
      width: var(--range-mark-thickness, $range-mark-thickness);
      height: var(--range-mark-size, $range-mark-size);
      top: var(--range-mark-offset, $range-mark-offset);
      position: absolute;
      border-radius: 1px;
      background-color: var(--range-mark-color, $range-mark-color);
      margin: 0 calc(var(--range-mark-thickness, $range-mark-thickness) / -2);

      &_active {
        background-color: var(
          --range-mark-active-color,
          $range-mark-active-color
        );
      }
    }
    &_vertical &__mark {
      height: var(--range-mark-thickness, $range-mark-thickness);
      width: var(--range-mark-size, $range-mark-size);
      left: var(--range-mark-offset, $range-mark-offset);
      top: auto;
      margin: calc(var(--range-mark-thickness, $range-mark-thickness) / -2) 0;
    }
    &__mark-labels {
    }
    &__mark-label {
      top: var(--range-mark-label-offset, $range-mark-label-offset);
      position: absolute;
      font-size: 14px;
      transform: translateX(-50%);
      white-space: nowrap;
      color: var(--range-mark-label-color, $range-mark-label-color);

      &_active {
        color: var(
          --range-mark-label-active-color,
          $range-mark-label-active-color
        );
      }
    }
    &_reversed &__mark-label {
      transform: translateX(50%);
    }
    &_vertical &__mark-label {
      top: auto;
      left: var(--range-mark-label-offset, $range-mark-label-offset);
      transform: translateY(50%);
    }
    &_vertical&_reversed &__mark-label {
      transform: translateY(-50%);
    }
    &_disabled &__mark-label {
      opacity: 0.7;
    }
  }
</style>

<script>
  let className = ''
  export { className as class }
  export let size = 32
  export let width = 4

  const radius = 20

  $: style = `width: ${size}px; height: ${size}px`
  $: circumference = 2 * Math.PI * radius
  $: strokeDashArray = Math.round(circumference * 1000) / 1000
  $: strokeDashOffset = `${circumference}px`
  $: viewBoxSize = radius / (1 - width / size)
  $: strokeWidth = (width / size) * viewBoxSize * 2
  $: viewBox = `0 0 ${viewBoxSize * 2} ${viewBoxSize * 2}`
</script>

<div class="spinner {className}" {style} role="progressbar">
  <svg class="spinner__svg" {viewBox}>
    <circle
      fill="transparent"
      cx={viewBoxSize}
      cy={viewBoxSize}
      r={radius}
      stroke-width={strokeWidth}
      stroke-dasharray={strokeDashArray}
      stroke-dashoffset={strokeDashOffset}
      class="spinner__circle"
    />
  </svg>
</div>

<style lang="postcss" global>
  .spinner {
    display: block;
    position: relative;

    &__svg {
      width: 100%;
      height: 100%;
      margin: auto;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 0;
      animation: progress-circular-rotate 1.4s linear infinite;
      transform-origin: center center;

      @keyframes progress-circular-rotate {
        100% {
          transform: rotate(360deg);
        }
      }
    }
    &__circle {
      stroke: currentColor;
      z-index: 2;
      animation: progress-circular-dash 1.4s ease-in-out infinite;
      stroke-linecap: round;
      stroke-dasharray: 80, 200;
      stroke-dashoffset: 0;

      @keyframes progress-circular-dash {
        0% {
          stroke-dasharray: 1, 200;
          stroke-dashoffset: 0;
        }
        50% {
          stroke-dasharray: 100, 200;
          stroke-dashoffset: -15px;
        }
        100% {
          stroke-dasharray: 100, 200;
          stroke-dashoffset: -125px;
        }
      }
    }
  }
</style>

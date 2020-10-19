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

<div class="spinner {className}" {style}>
  <svg xmlns="http://www.w3.org/2000/svg" {viewBox} class="spinner__svg">
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

<style lang="scss" global>
  .spinner {
    position: relative;
    display: inline-flex;
    vertical-align: middle;
    justify-content: center;
    align-items: center;

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
      vertical-align: middle;
      animation: progress-circular-rotate 1.4s linear infinite;
      transform-origin: center center;
      transition: all 0.2s ease-in-out;

      @keyframes progress-circular-rotate {
        /* autoprefixer: off */
        100% {
          transform: rotate(360deg);
        }
      }
    }
    &__circle {
      stroke: currentColor;
      z-index: 2;
      transition: all 0.6s ease-in-out;
      animation: progress-circular-dash 1.4s ease-in-out infinite;
      stroke-linecap: round;
      stroke-dasharray: 80, 200;
      stroke-dashoffset: 0;

      @keyframes progress-circular-dash {
        /* autoprefixer: off */
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

  app-spinner:defined {
    display: inline-flex;
    vertical-align: middle;
  }

  app-spinner:not(:defined) {
    @extend .spinner;
    width: 1em;
    height: 1em;
  }
</style>

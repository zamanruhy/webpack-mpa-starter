import { splitProps } from 'solid-js'

export default function Spinner(props) {
  const [, rest] = splitProps(props, ['class', 'classList'])

  return (
    <div
      class="relative h-[var(--spinner-size,1em)] w-[var(--spinner-size,1em)]"
      classList={{ [props.class]: Boolean(props.class), ...props.classList }}
      role="progressbar"
      {...rest}
    >
      <svg class="absolute top-0 left-0 h-full w-full animate-[spin_1.4s_linear_infinite] overflow-visible">
        <style jsx>{`
          @keyframes spinner-dash {
            0% {
              stroke-dasharray: 0.008, 1.59;
              stroke-dashoffset: 0;
            }
            50% {
              stroke-dasharray: 0.796, 1.59;
              stroke-dashoffset: -0.119;
            }
            100% {
              stroke-dasharray: 0.796, 1.59;
              stroke-dashoffset: -0.995;
            }
          }
        `}</style>
        <circle
          class="animate-[spinner-dash_1.4s_ease-in-out_infinite] [r:calc(50%-var(--spinner-thickness,2px)/2)]"
          fill="transparent"
          cx="50%"
          cy="50%"
          r="50%"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-width="var(--spinner-thickness, 2px)"
          pathLength="1"
          stroke-dasharray="1"
          stroke-dashoffset="0"
        />
      </svg>
    </div>
  )
}

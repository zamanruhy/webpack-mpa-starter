import { splitProps } from 'solid-js'

export default function Hamburger(props) {
  const [, rest] = splitProps(props, ['class', 'classList', 'active'])

  return (
    <button
      class="box-content flex h-[20px] w-[24px] flex-col justify-between rounded py-2.5 px-2 transition focus:outline-none focus-visible:ring focus-visible:ring-indigo-500/50"
      classList={{ [props.class]: Boolean(props.class), ...props.classList }}
      type="button"
      aria-label="Toggle menu"
      {...rest}
    >
      <span
        class="h-[2px] w-[24px] bg-current transition"
        classList={{ 'translate-y-[9px] rotate-45 scale-x-110': props.active }}
      />
      <span
        class="h-[2px] w-[24px] bg-current transition"
        classList={{ 'opacity-0': props.active }}
      />
      <span
        class="h-[2px] w-[24px] bg-current transition"
        classList={{
          '-translate-y-[9px] -rotate-45 scale-x-110': props.active
        }}
      />
    </button>
  )
}

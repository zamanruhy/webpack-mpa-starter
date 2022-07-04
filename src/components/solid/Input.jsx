import { splitProps } from 'solid-js'

export default function Input(props) {
  const [, rest] = splitProps(props, ['class', 'classList', 'invalid'])

  return (
    <input
      class="block min-h-10 w-full rounded border
        border-slate-300 bg-white px-4 py-1
        placeholder-slate-400 placeholder-opacity-100 transition
        focus:border-indigo-500 focus:outline-none
        focus:ring-1 focus:ring-indigo-500"
      classList={{
        [props.class]: Boolean(props.class),
        ...props.classList,
        'border-red-600': props.invalid
      }}
      type="text"
      {...rest}
    />
  )
}

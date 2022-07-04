import { splitProps, createSignal } from 'solid-js'
import Input from './Input.jsx'

export default function PasswordInput(props) {
  const [, rest] = splitProps(props, ['type'])
  const [show, setShow] = createSignal(false)

  return (
    <>
      <Input class="pr-[74px]" type={show() ? 'text' : 'password'} {...rest} />
      <div class="absolute inset-y-0 right-0 flex w-[74px] items-center justify-center">
        <button
          class="h-7 rounded bg-slate-200 px-3 text-sm font-semibold text-gray-700"
          type="button"
          onClick={() => setShow(!show())}
        >
          {show() ? 'Hide' : 'Show'}
        </button>
      </div>
    </>
  )
}

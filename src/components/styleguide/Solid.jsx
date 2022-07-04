import { createEffect, createMemo, createSignal, onCleanup } from 'solid-js'

import Hamburger from '../solid/Hamburger.jsx'
import Spinner from '../solid/Spinner.jsx'
import Button from '../solid/Button.jsx'
import ToTop from '../solid/ToTop.jsx'
import Input from '../solid/Input.jsx'
import PasswordInput from '../solid/PasswordInput.jsx'
import MaskedInput from '../solid/MaskedInput.jsx'

import { Transition as SolidTransition } from 'solid-transition-group'

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
  DialogOverlay
} from 'solid-headless'

// console.log(
//   'JSX to dom',
//   Array.isArray(
//     <>
//       <div>Some cnt</div>
//       <b>bold</b>
//     </>
//   )
// )

export default function Solid(props) {
  const [count, setCount] = createSignal(3)
  const [menuOpen, setMenuOpen] = createSignal(false)
  const [checked, setChecked] = createSignal(false)
  const [inputValue, setInputValue] = createSignal('b')
  const [mInputValue, setMInputValue] = createSignal('+7(523) 4')
  const power = createMemo(() => count() ** 2)
  const [isOpen, setIsOpen] = createSignal(false)
  const [maskPattern, setMaskPattern] = createSignal('{+7}(#00) 000-0000')

  let inputRef

  // createEffect(() => {
  //   console.log(`Current state: ${count()} ** 2 = ${power()}`)
  //   onCleanup(() => console.log('onCleanup'))
  // })

  createEffect(() => {
    // console.log('inputRef:', inputRef)
  })

  function action(node, fn) {
    // node.classList.add('max-w-min')
    // console.log('action', node, fn?.())
    // onCleanup(() => alert(34))
    // return { destroy: () => alert(34) }
  }

  // console.log('<Hamburger />', <Hamburger />)

  return (
    <>
      <div class="container">
        <>
          <Button
            type="button"
            variant="primary"
            onClick={() => setIsOpen(true)}
          >
            Open dialog
          </Button>

          <Transition appear show={isOpen()}>
            <Dialog
              isOpen
              class="fixed inset-0 z-10 overflow-y-auto"
              onClose={() => setIsOpen(false)}
            >
              <div class="flex min-h-screen items-center justify-center px-4">
                <TransitionChild
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <DialogOverlay class="fixed inset-0 bg-gray-900 bg-opacity-50" />
                </TransitionChild>

                {/* This element is to trick the browser into centering the modal contents. */}
                <span
                  class="inline-block h-screen align-middle"
                  aria-hidden="true"
                >
                  &#8203;
                </span>
                <TransitionChild
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <DialogPanel class="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-50 p-6 text-left align-middle shadow-xl transition-all dark:border dark:border-gray-50 dark:bg-gray-900">
                    <DialogTitle
                      as="h3"
                      class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-50"
                    >
                      Payment successful
                    </DialogTitle>
                    <input
                      class="border border-gray-300"
                      type="text"
                      value={inputValue()}
                      onInput={(e) => setInputValue(e.target.value)}
                    />
                    <div class="mt-2">
                      <p class="text-sm text-gray-900 dark:text-gray-50">
                        Your payment has been successfully submitted. We’ve sent
                        your an email with all of the details of your order.
                      </p>
                    </div>

                    <div class="mt-4">
                      <Button
                        type="button"
                        variant="primary"
                        onClick={() => setIsOpen(false)}
                      >
                        Got it, thanks!
                      </Button>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </Dialog>
          </Transition>
        </>

        {/* <label for="label-button">Lable</label>
        <Button
          type="button"
          variant="primary"
          size="md"
          id="label-button"
          onClick={() => alert('text')}
        >
          Button
        </Button> */}
        {/* <button disabled={null}>Button</button> */}

        <SolidTransition
          enterActiveClass="transition duration-[400ms]"
          enterClass="opacity-0 rotate-[-120deg] scale-50"
          enterToClass="opacity-100 rotate-0 scale-100"
          exitActiveClass="duration-200 transition ease-out"
          exitClass="opacity-100"
          exitToClass="opacity-0 translate-x-[200%]"
        >
          {checked() && (
            <h2 className="w-fit text-2xl" ref={action}>
              Title
            </h2>
          )}
        </SolidTransition>

        <hr class="my-6" />

        <div className="grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Input placeholder="Some placeholder" />

          <div className="flex">
            <div className="flex items-center rounded-l border border-r-0 border-slate-300 bg-slate-100 px-4">
              @
            </div>
            <Input
              class="rounded-l-none"
              type="email"
              placeholder="Enter email"
            />
          </div>

          <div className="flex">
            <Input
              class="-mr-px rounded-r-none border-r-transparent bg-clip-padding focus:z-10"
              type="text"
              placeholder="Close to button"
            />
            <Button class="rounded-l-none" type="button" variant="primary">
              Send
            </Button>
          </div>

          <div className="relative flex">
            <div class="pointer-events-none absolute inset-y-0 left-0 grid w-10 place-content-center">
              <svg viewBox="0 0 14 14" class="ml-0.5 h-4 fill-slate-300">
                <path d="M2.2.01a.49.49 0 0 0-.28.02C.87.43.22 1.93.06 2.96c-.49 3.33 2.15 6.21 4.57 8.1 2.15 1.7 6.27 4.46 8.71 1.79.31-.33.68-.81.66-1.3-.06-.81-.81-1.4-1.4-1.84-.44-.33-1.37-1.24-1.95-1.22-.52.02-.85.57-1.18.9l-.58.58c-.1.1-1.34-.72-1.47-.82a9.88 9.88 0 0 1-2.56-2.42c-.1-.13-.9-1.32-.81-1.41 0 0 .67-.74.87-1.03.4-.62.71-1.1.25-1.84a4.33 4.33 0 0 0-.62-.71c-.4-.4-.81-.8-1.28-1.13a2.7 2.7 0 0 0-1.06-.6Z" />
              </svg>
            </div>
            <Input class="pl-10 pr-10" type="tel" placeholder="Phone number" />
            <div class="pointer-events-none absolute inset-y-0 right-0 flex w-10 items-center justify-center">
              <svg viewBox="0 0 14 14" class="mr-0.5 h-4 fill-green-600">
                <path d="M5.5 12 14 3.5 12.5 2l-7 7-4-4L0 6.5z" />
              </svg>
            </div>
          </div>

          <div className="relative flex">
            <PasswordInput placeholder="Enter password" value="Secret" />
          </div>

          <div className="relative">
            <label
              for="with-label"
              class="mb-2 block text-sm font-bold text-gray-700"
            >
              With label
            </label>
            <Input
              value={mInputValue()}
              onInput={(e) => setMInputValue(e.target.value)}
              id="with-label"
              placeholder="With label and hint"
              aria-describedby="with-hint"
            />
            <div class="mt-1.5 text-xs text-slate-400" id="with-hint">
              Some useful hint under input
            </div>
          </div>

          <div className="relative">
            <Input
              value={maskPattern()}
              onInput={(e) => setMaskPattern(e.target.value)}
              invalid
              placeholder="With error"
              aria-describedby="with-error"
            />
            <div class="mt-1.5 text-xs text-red-600" id="with-error">
              Please select your currency
            </div>
          </div>

          <MaskedInput
            value={mInputValue()}
            onInput={(e) => setMInputValue(e.target.value)}
            mask={maskPattern()}
            definitions={{ '#': /[5-8]/ }}
            unmask={checked()}
            name="masked-input"
            placeholder="Masked input"
          />
          {mInputValue()}
        </div>

        <hr class="my-6" />

        <Hamburger
          class="some-class"
          title={inputValue()}
          active={menuOpen()}
          onClick={() => setMenuOpen(!menuOpen())}
        />
        <hr class="my-6" />
        <Spinner class="text-[40px] hover:[--spinner-thickness:4px] md:text-[70px]" />
        <hr class="my-6" />
        <div className="flex gap-3">
          <Button type="button" variant="primary" disabled={checked()}>
            Button
          </Button>
          <Button as="a" href="#" variant="primary" disabled={checked()}>
            Button
          </Button>
          <Button
            type="button"
            variant="primary"
            class="some-class"
            loading={checked()}
            classList={{ Whatever: checked() }}
          >
            <svg
              class="mr-1.5 h-4 fill-current"
              aria-hidden="true"
              viewBox="0 0 17 13"
            >
              <path d="M13.8 7.29v4.73c0 .17-.06.32-.19.44a.58.58 0 0 1-.45.19H9.33V8.86H6.77v3.79H2.94a.58.58 0 0 1-.45-.19.58.58 0 0 1-.19-.44V7.26l.01-.03 5.74-4.68 5.74 4.68.01.06zm2.23-.68-.62.73a.35.35 0 0 1-.21.1h-.03a.33.33 0 0 1-.21-.06L8.05 1.69 1.14 7.38a.36.36 0 0 1-.24.06.35.35 0 0 1-.21-.1l-.62-.73A.34.34 0 0 1 0 6.37a.3.3 0 0 1 .11-.21L7.29.26C7.5.09 7.76 0 8.05 0c.29 0 .55.09.76.26l2.44 2.01V.35c0-.1.03-.17.09-.23a.3.3 0 0 1 .23-.09h1.91c.1 0 .17.03.23.09a.3.3 0 0 1 .09.23v4.02l2.19 1.79c.07.05.1.13.11.21a.34.34 0 0 1-.07.24z"></path>
            </svg>
            Button
          </Button>
        </div>
        <hr class="my-6" />
        <input
          type="checkbox"
          checked={checked()}
          onChange={(e) => setChecked(e.target.checked)}
        />
        {checked() + ''}
      </div>
      <ToTop />
      <div class="mb-100 font-base text-cool ease-asdf transition lg:grid lg:grid-cols-2 2xl:grid-cols-5">
        <div class="mx-auto max-w-md px-8 sm:max-w-xl lg:mr-0 lg:max-w-full lg:self-center lg:px-12 lg:py-24 2xl:col-span-2">
          <img
            class="h-10"
            src="https://raw.githubusercontent.com/tailwindlabs/tailwindcss-from-zero-to-production/98b52c61259c732226c2ec0207ba2246e67a34e6/02-the-utility-first-workflow/img/logo.svg"
            alt="#"
            width="185"
            height="32"
            onClick={(e) => alert(33434)}
          />
          <img
            src="https://raw.githubusercontent.com/tailwindlabs/tailwindcss-from-zero-to-production/main/02-the-utility-first-workflow/img/beach-work.jpg"
            width="1200"
            height="675"
            alt="#"
            class="mt-6 rounded-lg shadow-xl sm:mt-8 sm:h-64 sm:w-full sm:object-cover lg:hidden"
          />
          <h1 class="mt-6 text-2xl font-bold text-gray-900 sm:mt-8 sm:text-4xl lg:text-3xl xl:text-4xl">
            You can work from anywhere.
            <br />
            <span class="text-indigo-500">
              {count()} {power()} | Take advantage of it.
            </span>
          </h1>
          <p class="max-w-70ch mt-2 leading-normal text-gray-600 sm:mt-4 sm:text-xl">
            Workcation helps you find work-friendly rentals in beautiful
            locations so you can enjoy some nice weather even when you're not on
            vacation.
          </p>
          <div class="mt-4 flex flex-wrap gap-2 sm:mt-8">
            <button
              class="inline-block rounded-lg bg-indigo-500 px-5 py-3 text-sm font-semibold uppercase tracking-wider text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-50 focus-visible:ring-offset-2 active:bg-indigo-600 sm:text-base"
              type="button"
              onClick={() => setCount(count() + 1)}
            >
              Book your escape
            </button>
            <button
              class="inline-block rounded-lg bg-indigo-500 px-5 py-3 text-sm font-semibold uppercase tracking-wider text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-50 focus-visible:ring-offset-2 active:bg-indigo-600 sm:text-base"
              type="button"
            >
              Learn more
            </button>
          </div>
        </div>
        <div class="hidden lg:block 2xl:col-span-3">
          <img
            src="https://raw.githubusercontent.com/tailwindlabs/tailwindcss-from-zero-to-production/main/02-the-utility-first-workflow/img/beach-work.jpg"
            width="1200"
            height="675"
            alt="#"
            class="h-full w-full object-cover"
          />
        </div>
      </div>
    </>
  )
}

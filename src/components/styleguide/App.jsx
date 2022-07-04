import {
  HeadlessDisclosureChild,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition
} from 'solid-headless'
import { createSignal, For } from 'solid-js'

function CheckIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  )
}

function SelectorIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M8 9l4-4 4 4m0 6l-4 4-4-4"
      />
    </svg>
  )
}

const people = [
  { name: 'Wade Cooper' },
  { name: 'Arlene Mccoy' },
  { name: 'Devon Webb' },
  { name: 'Tom Cook' },
  { name: 'Tanya Fox' },
  { name: 'Hellen Schmidt' }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [selected, setSelected] = createSignal(people[0])

  return (
    <div class="w-72 fixed top-16">
      <Listbox value={selected()} onSelectChange={setSelected}>
        <div class="relative mt-1">
          <ListboxButton class="relative w-full py-2 pl-3 pr-10 text-left bg-white text-current rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
            <span class="block truncate">{selected().name}</span>
            <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon class="w-5 h-5 text-gray-400" aria-hidden="true" />
            </span>
          </ListboxButton>
          <HeadlessDisclosureChild>
            {({ isOpen }) => (
              <Transition
                show={isOpen()}
                enter="transition ease-in duration-100"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition ease-out duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <ListboxOptions class="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  <For each={people}>
                    {(person) => (
                      <ListboxOption
                        class="focus:outline-none group"
                        value={person}
                      >
                        {({ isActive, isSelected }) => (
                          <div
                            class={classNames(
                              isActive()
                                ? 'text-amber-900 bg-amber-100'
                                : 'text-gray-900',
                              'group-hover:text-amber-900 group-hover:bg-amber-100',
                              'cursor-default select-none relative py-2 pl-10 pr-4'
                            )}
                          >
                            <span
                              class={classNames(
                                isSelected() ? 'font-medium' : 'font-normal',
                                'block truncate'
                              )}
                            >
                              {person.name}
                            </span>
                            {isSelected() ? (
                              <span
                                class={classNames(
                                  isActive()
                                    ? 'text-amber-600'
                                    : 'text-amber-600',
                                  'group-hover:text-amber-600',
                                  'absolute inset-y-0 left-0 flex items-center pl-3'
                                )}
                              >
                                <CheckIcon class="w-5 h-5" aria-hidden="true" />
                              </span>
                            ) : null}
                          </div>
                        )}
                      </ListboxOption>
                    )}
                  </For>
                </ListboxOptions>
              </Transition>
            )}
          </HeadlessDisclosureChild>
        </div>
      </Listbox>
    </div>
  )
}

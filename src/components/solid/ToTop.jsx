import {
  onMount,
  onCleanup,
  createSignal,
  createMemo,
  splitProps
} from 'solid-js'

export default function ToTop(props) {
  const [, rest] = splitProps(props, ['offset', 'children'])
  const [scrollTop, setScrollTop] = createSignal(0)
  const active = createMemo(() => scrollTop() > (props.offset || 600))

  function scrollToTop() {
    const currentScroll = window.pageYOffset
    if (currentScroll > 0) {
      requestAnimationFrame(scrollToTop)
      window.scrollTo(0, Math.floor(currentScroll - currentScroll / 5))
    }
  }

  onMount(() => {
    function onScroll() {
      setScrollTop(window.pageYOffset)
    }
    window.addEventListener('scroll', onScroll)
    onCleanup(() => window.removeEventListener('scroll', onScroll))
  })

  return (
    <button
      class="pointer-events-none fixed right-5 bottom-5 z-fixed flex h-14 w-14 items-center justify-center rounded-full bg-indigo-500 text-white opacity-0 transition duration-200 hover:bg-indigo-400 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500/50 focus-visible:ring-offset-2 active:bg-indigo-600 md:right-10 md:bottom-10"
      classList={{ 'pointer-events-auto opacity-100': active() }}
      type="button"
      aria-label="Scroll to top"
      {...rest}
      onClick={scrollToTop}
    >
      {props.children || (
        <svg class="h-6 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z" />
        </svg>
      )}
    </button>
  )
}

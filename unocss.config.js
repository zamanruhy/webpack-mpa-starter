const { presetUno } = require('unocss')

// console.log(presetUno().theme.colors)

const useRem = false

module.exports = {
  presets: [presetUno()],
  include: ['./src/**/*.{html,js,jsx,svelte}'],
  theme: {
    colors: {
      theme: 'var(--color-theme)',
      text: 'var(--color-text)',
      bg: 'var(--color-bg)'
    },
    fontFamily: {
      base: ['OpenSans', presetUno().theme.fontFamily.sans]
    },
    fontSize: {
      base: ['16px', '1.5']
    },
    lineHeight: {
      normal: 1.5
    },
    breakpoints: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1400px'
    },
    zIndex: {
      fixed: 1100,
      backdrop: 1200,
      modal: 1300,
      popup: 1400
    },
    // extra
    ease: {
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)'
    },
    transition: '200ms cubic-bezier(0.4, 0, 0.2, 1)'
  },
  shortcuts: {
    btn: 'inline-block bg-indigo-500 hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring focus-visible:ring-offset-2 focus-visible:ring-opacity-50 focus-visible:ring-indigo-500 !active:bg-indigo-600 hover:-translate-y-0.5 transition text-white rounded-lg shadow-lg px-5 py-3 uppercase tracking-wider font-semibold text-sm sm:text-base'
  },
  blocklist: ['container'],
  postprocess: [
    (util) => {
      if (util.selector.startsWith('.dark')) {
        util.selector = util.selector.replace('.dark ', '[data-theme="dark"] ')
      }
    },
    useRem
      ? (util) => {
          const matcher = /([0-9]+(?:\.[0-9]+)?)px/gim
          for (const entry of util.entries) {
            if (matcher.test(entry[1])) {
              entry[1] = entry[1].replace(matcher, (_, px) =>
                px === '1' ? '1px' : (+px / 16).toFixed(3) + 'rem'
              )
            }
          }
        }
      : (util) => {
          const matcher = /([0-9]+(?:\.[0-9]+)?)rem/gim
          for (const entry of util.entries) {
            if (matcher.test(entry[1])) {
              entry[1] = entry[1].replace(
                matcher,
                (_, rem) => (+rem * 16).toFixed(3) + 'px'
              )
            }
          }
        }
    // {
    //   selector: '.hidden',
    //   entries: [ [ 'display', 'none' ] ],
    //   parent: undefined
    // }
  ],
  rules: [
    ['ease-in', { 'transition-timing-function': 'cubic-bezier(0.4, 0, 1, 1)' }],
    [
      'ease-out',
      { 'transition-timing-function': 'cubic-bezier(0, 0, 0.2, 1)' }
    ],
    [
      'ease-in-out',
      { 'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)' }
    ],
    ['transition', { transition: '200ms cubic-bezier(0.4, 0, 0.2, 1)' }]
  ]
}

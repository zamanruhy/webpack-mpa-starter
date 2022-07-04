// const { fromString, fromRgb } = require('css-color-converter')

const breakpoints = {
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  '2xl': '1400px'
}

// Variables
const variables = {
  'color-primary': 'blue', // #a17d78
  'side-padding': '15px',
  'max-width': 'calc(1200px + $side-padding * 2)'
}

// Functions
const functions = {
  // lighten(value, frac) {
  //   const lighten = 1 + parseFloat(frac)
  //   const rgba = fromString(value).toRgbaArray()
  //   const r = rgba[0] * lighten
  //   const g = rgba[1] * lighten
  //   const b = rgba[2] * lighten
  //   return fromRgb([r, g, b]).toHexString()
  // },
  // darken(value, frac) {
  //   const darken = 1 - parseFloat(frac)
  //   const rgba = fromString(value).toRgbaArray()
  //   const r = rgba[0] * darken
  //   const g = rgba[1] * darken
  //   const b = rgba[2] * darken
  //   return fromRgb([r, g, b]).toHexString()
  // },
  // 'to-rgba'(value, alpha = 1) {
  //   alpha = parseFloat(alpha)
  //   const [r, g, b] = fromString(value).toRgbaArray()
  //   return `rgba(${[r, g, b, alpha]})`
  // },
  linear(v1, v2, w1, w2, unit) {
    if (!['vh', 'vmin', 'vmax'].includes(unit)) {
      unit = 'vw'
    }

    v1 = v1.split(' ').map((v) => parseFloat(v))
    v2 = v2.split(' ').map((v) => parseFloat(v))
    ;[w1, w2] = [w1, w2].map((v) => parseFloat(v))
    const list = []

    for (let i = 0; i < v1.length; i++) {
      const slope = (v2[i] - v1[i]) / (w2 - w1)
      const calc = `calc(${(v1[i] - w1 * slope).toFixed(3)}px + ${(
        100 * slope
      ).toFixed(3)}${unit})`
      list.push(`clamp(${v1[i]}px, ${calc}, ${v2[i]}px)`)
    }

    return list.join(' ')
  }
}

// Mixins
const mixins = {
  'font-face'(_, name, path, weight, style, exts = 'woff2 woff') {
    return {
      '@font-face': {
        'font-family': `"${name}"`,
        'font-weight': weight,
        'font-style': style,
        'font-display': 'swap',
        src: exts
          .split(' ')
          .map((ext) => `url("${path}.${ext}") format("${ext}")`)
          .join(',')
      }
    }
  },
  // up(_, min) {
  //   min = parseFloat(breakpoints[min] || min)
  //   return {
  //     [`@media (min-width: ${min}px)`]: {
  //       '@mixin-content': {}
  //     }
  //   }
  // },
  // down(_, max) {
  //   max = parseFloat(breakpoints[max] || max)
  //   return {
  //     [`@media (max-width: ${max - 1}px)`]: {
  //       '@mixin-content': {}
  //     }
  //   }
  // },
  // between(_, min, max) {
  //   return {
  //     [`@mixin up ${min}`]: {
  //       [`@mixin down ${max}`]: {
  //         '@mixin-content': {}
  //       }
  //     }
  //   }
  // },
  ...Object.keys(breakpoints).reduce((acc, bp) => {
    const val = parseFloat(breakpoints[bp])
    return {
      ...acc,
      [bp]: () => {
        return {
          [`@media (min-width: ${val}px)`]: {
            '@mixin-content': {}
          }
        }
      },
      [`<${bp}`]: () => {
        return {
          [`@media (max-width: ${val - 0.1}px)`]: {
            '@mixin-content': {}
          }
        }
      }
    }
  }, {}),
  truncate(_, lines = 1) {
    return parseInt(lines) === 1
      ? {
          'white-space': 'nowrap',
          'text-overflow': 'ellipsis',
          overflow: 'hidden'
        }
      : {
          display: '-webkit-box',
          '-webkit-line-clamp': lines,
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden'
        }
  },
  'focus-ring'(_, width = '3px', offset = '2px', color = 'hsl(39 89% 55%)') {
    return {
      outline: `var(--focus-ring-width, ${width}) solid var(--focus-ring-color, ${color})`,
      'outline-offset': `var(--focus-ring-offset, ${offset})`
    }
  },
  'visually-hidden': {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    border: 0
  },
  steps(_, property, v1, v2, w1, w2, step = 1) {
    const vUnit = v1.match(/\d+(.*)$/)?.[1] ?? ''
    ;[v1, v2, w1, w2, step] = [v1, v2, w1, w2, step].map((v) => parseFloat(v))
    const count = (v2 - v1) / step
    const wStep = (w2 - w1) / count

    return Array.from({ length: count }, (_, k) => k + 1).reduce(
      (acc, n) => {
        return {
          ...acc,
          [`@media (min-width: ${w1 + (n - 0.5) * wStep}px)`]: {
            [property]: `${v1 + n * step}${vUnit}`
          }
        }
      },
      {
        [property]: `${v1}${vUnit}`
      }
    )
  }
}

module.exports = { variables, functions, mixins }

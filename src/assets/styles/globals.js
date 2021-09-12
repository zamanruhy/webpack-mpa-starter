const { fromString, fromRgb } = require('css-color-converter')

const breakpoints = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400
}

// Variables
const variables = {
  'color-primary': '#a17d78'
}

// Functions
const functions = {
  lighten(value, frac) {
    const lighten = 1 + parseFloat(frac)
    const rgba = fromString(value).toRgbaArray()
    const r = rgba[0] * lighten
    const g = rgba[1] * lighten
    const b = rgba[2] * lighten
    return fromRgb([r, g, b]).toHexString()
  },
  darken(value, frac) {
    const darken = 1 - parseFloat(frac)
    const rgba = fromString(value).toRgbaArray()
    const r = rgba[0] * darken
    const g = rgba[1] * darken
    const b = rgba[2] * darken
    return fromRgb([r, g, b]).toHexString()
  },
  'to-rgba'(value, alpha = 1) {
    alpha = parseFloat(alpha)
    const [r, g, b] = fromString(value).toRgbaArray()
    return `rgba(${[r, g, b, alpha]})`
  },
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
      const calc = `calc(${v1[i] - w1 * slope}px + ${100 * slope}${unit})`
      list.push(`clamp(${v1[i]}px, ${calc}, ${v2[i]}px)`)
    }

    return list.join(' ')
  }
}

// Mixins
const mixins = {
  'font-face'(_, name, path, weight, style, exts = 'woff2 woff') {
    const src = exts
      .split(' ')
      .map((ext) => `url("${path}.${ext}") format("${ext}")`)
      .join(',')
    return {
      '@font-face': {
        'font-family': `"${name}"`,
        'font-weight': weight,
        'font-style': style,
        'font-display': 'swap',
        src
      }
    }
  },
  up(_, min) {
    min = breakpoints[min] || parseFloat(min)
    return min > 0
      ? {
          [`@media (min-width: ${min}px)`]: {
            '@mixin-content': {}
          }
        }
      : {
          '@mixin-content': {}
        }
  },
  down(_, max) {
    max = breakpoints[max] || parseFloat(max)
    max = max - 0.02
    return max > 0
      ? {
          [`@media (max-width: ${max}px)`]: {
            '@mixin-content': {}
          }
        }
      : {}
  },
  between(_, min, max) {
    return {
      [`@mixin up ${min}`]: {
        [`@mixin down ${max}`]: {
          '@mixin-content': {}
        }
      }
    }
  },
  truncate(_, lines = 1, lineHeight) {
    return parseInt(lines) === 1
      ? {
          overflow: 'hidden',
          'text-overflow': 'ellipsis',
          'white-space': 'nowrap'
        }
      : {
          display: '-webkit-box',
          '-webkit-line-clamp': lines,
          '-webkit-box-orient': 'vertical',
          'max-height': `calc(${lines} * ${lineHeight} * 1em)`,
          'line-height': lineHeight,
          overflow: 'hidden',
          'text-overflow': 'ellipsis'
        }
  },
  'focus-ring'(_, width = '3px', offset = '2px') {
    return {
      outline: `${width} solid #f2ab24`,
      'outline-offset': offset
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
          [`@mixin up ${w1 + (n - 0.5) * wStep}px`]: {
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

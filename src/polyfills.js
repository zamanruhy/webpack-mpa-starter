if (process.env.BROWSERSLIST_ENV === 'legacy') {
  require('svgxuse')
  require('@webcomponents/custom-elements')
  require('is-connected-node/implement')
  require('custom-event-polyfill')
  require('element-closest-polyfill')
}

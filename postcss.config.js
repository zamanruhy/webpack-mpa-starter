const pxToRem = false
const legacy = process.env.BROWSERSLIST_ENV === 'legacy'

module.exports = {
  plugins: [
    pxToRem &&
      require('postcss-pxtorem')({
        propList: ['*'],
        selectorBlackList: [/^html$/]
      }),
    legacy &&
      require('postcss-selector-replace')({
        before: [/:defined/g],
        after: ['[defined]']
      }),
    require('postcss-selector-replace')({
      before: [/:focus-visible/g, /:-moz-focusring/g],
      after: ['[data-focus-visible-added]', ':-del']
    }),
    require('autoprefixer')
  ]
}

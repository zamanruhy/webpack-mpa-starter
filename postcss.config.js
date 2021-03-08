const pxToRem = false

module.exports = {
  plugins: [
    pxToRem &&
      require('postcss-pxtorem')({
        propList: ['*'],
        selectorBlackList: [/^html$/]
      }),
    require('postcss-selector-replace')({
      before: [/:focus-visible/g],
      after: ['[data-focus-visible-added]']
    }),
    require('autoprefixer')
  ]
}

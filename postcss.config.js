const pxToRem = false

module.exports = {
  plugins: [
    pxToRem &&
      require('postcss-pxtorem')({
        propList: ['*'],
        selectorBlackList: [/^html$/]
      }),
    require('autoprefixer')
  ]
}

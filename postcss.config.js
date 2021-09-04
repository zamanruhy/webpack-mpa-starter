const pxToRem = false

module.exports = {
  plugins: [
    require('postcss-nested'),
    pxToRem &&
      require('postcss-pxtorem')({
        propList: ['*'],
        selectorBlackList: [/^html$/]
      }),
    require('autoprefixer')
  ]
}

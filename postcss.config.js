const { variables, functions, mixins } = require('./src/assets/styles/globals')

module.exports = {
  plugins: [
    require('postcss-import-ext-glob'),
    require('postcss-import'),
    require('postcss-mixins')({ mixins }),
    require('postcss-simple-vars')({ variables }),
    require('postcss-functions')({ functions }),
    require('postcss-nested'),
    // require('postcss-calc'),
    require('postcss-extend'),
    false &&
      require('postcss-pxtorem')({
        propList: ['*'],
        selectorBlackList: [/^html$/]
      }),
    require('postcss-selector-replace')({
      before: [/:focus-visible/g],
      after: ['[data-focus-visible]']
    }),
    require('autoprefixer')
  ]
}

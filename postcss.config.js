const { variables, functions, mixins } = require('./src/assets/styles/globals')

const useRem = false

module.exports = {
  plugins: [
    require('postcss-import-ext-glob'),
    require('postcss-import'),
    require('postcss-mixins')({ mixins }),
    require('postcss-simple-vars')({ variables }),
    // require('postcss-functions')({ functions }),
    // require('postcss-nested'),
    require('tailwindcss/nesting'),
    require('postcss-url')({ url: 'rebase' }),
    require('tailwindcss'),
    useRem
      ? require('postcss-pxtorem')({
          propList: ['*'],
          selectorBlackList: [/^html$/]
        })
      : require('postcss-rem-to-pixel')({ propList: ['*'] }),
    require('autoprefixer')
  ]
}

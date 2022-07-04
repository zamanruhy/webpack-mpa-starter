'use strict'

const fs = require('fs')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const sveltePreprocess = require('svelte-preprocess')
const mpaPreprocess = require('./mpa-preprocess')
// const UnoCSS = require('@unocss/webpack').default
// const presetUno = require('@unocss/preset-mini').default

const isDev = process.env.NODE_ENV === 'development'

function resolve(dir) {
  return path.join(process.cwd(), dir)
}

module.exports = {
  entry: {
    app: resolve('src/main.js')
  },
  output: {
    path: resolve('dist'),
    filename: 'static/js/[name].js'
  },
  resolve: {
    alias: {
      '@': resolve('src')
    },
    extensions: ['.mjs', '.js', '.json', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
          emitError: true
        }
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules[/\\](?!(svelte|swiper|dom7))/,
        loader: 'babel-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.svelte$/,
        use: [
          'babel-loader',
          {
            loader: 'svelte-loader',
            options: {
              compilerOptions: {
                dev: isDev,
                accessors: true
              },
              emitCss: !isDev,
              // hotReload: isDev,
              preprocess: [
                mpaPreprocess(),
                sveltePreprocess({
                  sourceMap: isDev,
                  postcss: {
                    plugins: [
                      require('postcss-mixins')({
                        mixins: require('../../src/assets/styles/globals')
                          .mixins
                      }),
                      require('postcss-simple-vars')({}),
                      require('postcss-nested')
                    ]
                  }
                })
              ]
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        include: resolve('src/assets/icons'),
        type: 'asset/source',
        use: [
          {
            loader: 'svgo-loader',
            options: {
              multipass: true,
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      // customize options for plugins included in preset
                      convertPathData: { floatPrecision: 2 },
                      // or disable plugins
                      removeViewBox: false
                    }
                  }
                },
                // enable builtin plugin not included in default preset
                'removeDimensions',
                'prefixIds',
                'removeXMLNS',
                // enable and configure builtin plugin not included in preset
                {
                  name: 'removeAttributesBySelector',
                  params: {
                    selector: 'svg',
                    attributes: ['class', 'style', 'xml:space']
                  }
                }
              ]
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|avif)$/,
        exclude: resolve('src/assets/icons'),
        type: 'asset/resource',
        generator: {
          filename: 'static/img/[name][ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/media/[name][ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/fonts/[name][ext]'
        }
      },
      {
        test: /\.css$/,
        use: [
          isDev
            ? 'style-loader'
            : {
                loader: MiniCssExtractPlugin.loader,
                options: {}
              },
          {
            loader: 'css-loader',
            options: { sourceMap: isDev }
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: isDev }
          }
        ]
      },
      {
        test: /\.html$/,
        loader: 'ejs-loader',
        options: {
          variable: 'props',
          esModule: false
        }
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolve('public'),
          to: resolve('dist')
        }
      ]
    }),
    ...getHtmlWebpackPlugins()
    // UnoCSS()
  ]
}

function getHtmlWebpackPlugins() {
  const dir = resolve('src/pages')

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.html'))
    .map((file) => {
      const { name } = path.parse(file)
      return new HtmlWebpackPlugin({
        template: path.join(dir, 'layout'),
        filename: `${name}.html`,
        page: name,
        inject: 'head',
        scriptLoading: 'defer',
        minify: false
      })
    })
}

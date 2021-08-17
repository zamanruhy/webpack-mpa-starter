'use strict'

const fs = require('fs')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')

const isDev = process.env.NODE_ENV === 'development'

const scssData = '@use "./src/assets/scss/_globals.scss" as *;'

function resolve(dir) {
  return path.join(process.cwd(), dir)
}

module.exports = {
  // target: isDev ? 'web' : 'browserslist',
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
        test: /\.m?js$/,
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
              preprocess: require('svelte-preprocess')({
                sourceMap: isDev,
                postcss: true,
                scss: {
                  prependData: scssData,
                  renderSync: true
                }
              })
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        include: resolve('src/assets/svg'),
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              symbolId: 'icon-[name]',
              extract: true,
              spriteFilename: 'static/img/sprite.svg',
              publicPath: isDev ? '/' : ''
            }
          },
          'svgo-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|avif)(\?.*)?$/,
        exclude: resolve('src/assets/svg'),
        type: 'asset/resource',
        generator: {
          filename: 'static/img/[name][ext]'
        },
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              disable: isDev,
              mozjpeg: {
                progressive: true
              },
              optipng: {
                optimizationLevel: 7
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4
              },
              gifsicle: {
                interlaced: false
              }
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/media/[name][ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/fonts/[name][ext]'
        }
      },
      {
        test: /\.(scss|css)$/,
        use: [
          isDev
            ? 'style-loader'
            : {
                loader: MiniCssExtractPlugin.loader,
                options: {}
              },
          {
            loader: 'css-loader',
            options: { sourceMap: isDev, importLoaders: 1 }
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: isDev }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: isDev, additionalData: scssData }
          }
        ]
      },
      {
        test: /\.ejs$/,
        loader: 'ejs-loader',
        options: {
          // variable: 'data',
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
    ...getHtmlWebpackPlugins(),
    new SpriteLoaderPlugin()
  ]
}

function getHtmlWebpackPlugins() {
  const dir = resolve('src/pages')

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.ejs'))
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

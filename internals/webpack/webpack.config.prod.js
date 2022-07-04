'use strict'

const webpack = require('webpack')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const HtmlBeautifierPlugin = require('html-beautifier-webpack-plugin')

module.exports = merge(baseConfig, {
  mode: 'production',
  output: {
    filename: 'static/js/[name].js?[contenthash:8]',
    chunkFilename: 'static/js/[name].chunk.js?[contenthash:8]'
  },
  optimization: {
    splitChunks: {
      automaticNameDelimiter: '.',
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/].+\.js$/,
          name: 'vendors',
          chunks: 'initial'
        }
      }
    },
    minimizer: [
      new TerserPlugin({
        extractComments: false
      }),
      new CssMinimizerPlugin({
        minify: CssMinimizerPlugin.cssoMinify,
        minimizerOptions: {}
      }),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ['gifsicle', { interlaced: false }],
              ['mozjpeg', { progressive: true }],
              ['pngquant', { quality: [0.65, 0.9], speed: 4 }],
              [
                'svgo',
                {
                  multipass: true,
                  plugins: [
                    {
                      name: 'preset-default',
                      params: {
                        overrides: { convertPathData: { floatPrecision: 2 } }
                      }
                    }
                  ]
                }
              ]
            ]
          }
        }
      })
    ]
  },
  plugins: [
    new webpack.ids.HashedModuleIdsPlugin(),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].css?[contenthash:8]',
      chunkFilename: 'static/css/[name].chunk.css?[contenthash:8]'
    }),
    new HtmlBeautifierPlugin()
  ].concat(process.env.BUNDLE_ANALYZE ? new BundleAnalyzerPlugin() : [])
})

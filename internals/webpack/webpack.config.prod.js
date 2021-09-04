'use strict'

const webpack = require('webpack')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
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

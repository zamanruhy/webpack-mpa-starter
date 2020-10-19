'use strict'

const webpack = require('webpack')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const HtmlPrettifyPlugin = require('html-prettify-webpack-plugin')

module.exports = merge(baseConfig, {
  mode: 'production',
  output: {
    filename: 'static/js/[name].js?[contenthash:8]',
    publicPath: ''
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
        cache: true,
        parallel: true,
        sourceMap: false,
        extractComments: false
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true }
            }
          ]
        }
      })
    ]
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].css?[contenthash:8]'
    }),
    new HtmlPrettifyPlugin()
  ].concat(process.env.BUNDLE_ANALYZE ? new BundleAnalyzerPlugin() : [])
})

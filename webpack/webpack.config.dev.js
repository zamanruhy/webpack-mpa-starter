'use strict'

const webpack = require('webpack')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = 'localhost'
const PORT = 8080

const devConfig = merge(baseConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    clientLogLevel: 'silent',
    hot: true,
    contentBase: 'dist',
    compress: true,
    host: HOST,
    port: PORT,
    open: false,
    overlay: { warnings: true, errors: true },
    publicPath: '/',
    quiet: true,
    inline: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = PORT
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      devConfig.devServer.port = port
      devConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              `Your application is running here: http://${devConfig.devServer.host}:${port}`
            ]
          }
        })
      )
      resolve(devConfig)
    }
  })
})

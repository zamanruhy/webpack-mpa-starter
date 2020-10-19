'use strict'

const path = require('path')
const ora = require('ora')
const rimraf = require('rimraf')
const chalk = require('chalk')
const webpack = require('webpack')
const prodConfig = require('./webpack.config.prod')

const spinner = ora('building for production...')
spinner.start()

rimraf(path.resolve(__dirname, '../dist'), (err) => {
  if (err) throw err
  webpack(prodConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n'
    )

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
  })
})

/* eslint-disable prefer-promise-reject-errors */
'use strict'

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const BLOCKS_DIR = path.join(__dirname, '../src/components')
const fileSources = {
  ejs: `<div class="{blockName}"></div>`,
  scss: `.{blockName} {}`,
  js: `export default function {blockNameCamel}() {
  const el = document.querySelector('.{blockName}')

  if (!el) {
    return
  }
}`
}

function validateBlockName(blockName) {
  return new Promise((resolve, reject) => {
    const isValid = /^(\d|\w|-)+$/.test(blockName)

    if (isValid) {
      resolve(isValid)
    } else {
      const errMsg = `ERR>>> An incorrect block name '${blockName}'
       A block name must include letters, numbers & the minus symbol`
      reject(errMsg)
    }
  })
}

function directoryExist(blockPath, blockName) {
  return new Promise((resolve, reject) => {
    fs.stat(blockPath, (notExist) => {
      if (notExist) {
        resolve()
      } else {
        reject(`ERR>>> The block '${blockName}' already exists`)
      }
    })
  })
}

function createDir(dirPath) {
  return new Promise((resolve, reject) => {
    fs.mkdir(dirPath, (err) => {
      if (err) {
        reject(`ERR>>> Failed to create a folder '${dirPath}'`)
      } else {
        resolve()
      }
    })
  })
}

function createFiles(blocksPath, blockName) {
  const promises = []
  Object.keys(fileSources).forEach((ext) => {
    const blockNameCamel = blockName.replace(/-(\w)/g, (_, c) => {
      return c ? c.toUpperCase() : ''
    })
    const fileSource = fileSources[ext]
      .replace(/{blockName}/g, blockName)
      .replace(/{blockNameCamel}/g, blockNameCamel)
    const filename = `${blockName}.${ext}`
    const filePath = path.join(blocksPath, filename)

    promises.push(
      new Promise((resolve, reject) => {
        fs.writeFile(filePath, fileSource, 'utf8', (err) => {
          if (err) {
            reject(`ERR>>> Failed to create a file '${filePath}'`)
          } else {
            resolve()
          }
        })
      })
    )
  })

  return Promise.all(promises)
}

function getFiles(blockPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(blockPath, (err, files) => {
      if (err) {
        reject(`ERR>>> Failed to get a file list from a folder '${blockPath}'`)
      } else {
        resolve(files)
      }
    })
  })
}

function printErrorMessage(errText) {
  console.log(chalk.red(errText) + '\n')
}

function makeBlock(blockName) {
  const blockPath = path.join(BLOCKS_DIR, blockName)
  const line = '-'.repeat(51 + blockName.length)

  return validateBlockName(blockName)
    .then(() => directoryExist(blockPath, blockName))
    .then(() => createDir(blockPath))
    .then(() => createFiles(blockPath, blockName))
    .then(() => getFiles(blockPath))
    .then((files) => {
      console.log(
        chalk.greenBright(
          `The block has just been created in 'src/components/${blockName}'`
        )
      )
      console.log(chalk.green(line))

      files.forEach((file) => console.log(chalk.greenBright(file)))

      console.log('')
    })
    .catch(printErrorMessage)
}

// Command line arguments
const blockNames = process.argv.slice(2)

if (blockNames.length) {
  blockNames.forEach(makeBlock)
} else {
  printErrorMessage('ERR>>> Block name not passed')
}

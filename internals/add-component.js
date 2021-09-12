'use strict'

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const blocksDir = path.join(process.cwd(), 'src/components')
const fileSources = {
  ejs: `<div class="{blockName}"></div>`,
  pcss: `.{blockName} {}`,
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
        reject(new Error(`ERR>>> The block '${blockName}' already exists`))
      }
    })
  })
}

function createDir(dirPath) {
  return new Promise((resolve, reject) => {
    fs.mkdir(dirPath, (err) => {
      if (err) {
        reject(new Error(`ERR>>> Failed to create a folder '${dirPath}'`))
      } else {
        resolve()
      }
    })
  })
}

function createFiles(blocksPath, blockName, needJs) {
  const promises = []
  Object.keys(fileSources).forEach((ext) => {
    if (ext === 'js' && !needJs) {
      return
    }
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
            reject(new Error(`ERR>>> Failed to create a file '${filePath}'`))
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
        reject(
          new Error(
            `ERR>>> Failed to get a file list from a folder '${blockPath}'`
          )
        )
      } else {
        resolve(files)
      }
    })
  })
}

async function forcePostcssCompile() {
  const file = path.join(process.cwd(), 'src/assets/styles/main.pcss')
  const error = 'ERR>>> Failed to force postcss to build'

  const content = await new Promise((resolve, reject) => {
    fs.readFile(file, 'UTF8', (err, data) => {
      err ? reject(new Error(error)) : resolve(data)
    })
  })
  await new Promise((resolve, reject) => {
    fs.writeFile(file, content + ' ', (err) => {
      err ? reject(new Error(error)) : resolve()
    })
  })
  await new Promise((resolve, reject) => {
    fs.writeFile(file, content, (err) => {
      err ? reject(new Error(error)) : resolve()
    })
  })
}

function printErrorMessage(errText) {
  console.log(chalk.red(errText) + '\n')
}

async function makeBlock(blockName, needJs) {
  const blockPath = path.join(blocksDir, blockName)
  const line = '-'.repeat(51 + blockName.length)

  try {
    await validateBlockName(blockName)
    await directoryExist(blockPath, blockName)
    await createDir(blockPath)
    await createFiles(blockPath, blockName, needJs)
    const files = await getFiles(blockPath)

    console.log(
      chalk.greenBright(
        `The block has just been created in 'src/components/${blockName}'`
      )
    )
    console.log(chalk.green(line))

    files.forEach((file) => console.log(chalk.greenBright(file)))

    console.log('')

    await forcePostcssCompile()
  } catch (e) {
    printErrorMessage(e)
  }
}

// Command line arguments
const args = process.argv.slice(2)
const blockNames = args.filter((arg) => !arg.startsWith('-'))
const needJs = args.includes('--js')

if (blockNames.length) {
  blockNames.forEach((name) => makeBlock(name, needJs))
} else {
  printErrorMessage('ERR>>> Block name not passed')
}

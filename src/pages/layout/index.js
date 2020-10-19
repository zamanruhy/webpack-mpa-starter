export default function layout(templateData) {
  const { page } = templateData.htmlWebpackPlugin.options
  const content = require(`../${page}.ejs`)(templateData)
  return require(`./${global.layout || 'base'}.ejs`)({
    ...templateData,
    content
  })
}

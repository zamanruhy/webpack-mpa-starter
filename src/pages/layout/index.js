export default function layout(templateData) {
  const { page } = templateData.htmlWebpackPlugin.options
  const content = require(`../${page}.html`)(templateData)
  return require(`./${global.layout || 'base'}.html`)({
    ...templateData,
    content
  })
}

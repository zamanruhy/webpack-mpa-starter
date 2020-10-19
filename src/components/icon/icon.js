const icons = {}

const requireIcon = require.context('@/assets/svg', false, /\.svg$/)
requireIcon.keys().forEach((fileName) => {
  const iconConfig = requireIcon(fileName)
  // console.log(iconConfig.default || iconConfig)
  const { id, viewBox, url } = iconConfig.default || iconConfig
  const iconName = fileName.replace(/^\.\/|\.\w+$/g, '')
  const [width, height] = viewBox.split(' ').slice(-2).map(Number)
  icons[iconName] = { id, width, height, url }
})

export default icons

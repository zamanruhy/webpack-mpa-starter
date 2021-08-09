import './assets/scss/main.scss'
import { customElements } from './helpers/custom-elements'
import { dataModal, dataCollapse } from './helpers/data-attributes'
import header from './components/header/header'
import styleguide from './components/styleguide/styleguide'
import 'bootstrap/dist/css/bootstrap.css'

customElements()
dataModal()
dataCollapse()

header()
styleguide()

// Require all component styles
// require('./components/styleguide/styleguide.scss')
const requireStyle = require.context('./components', true, /\.scss$/)
requireStyle.keys().forEach(requireStyle)

// Live reload on templates changes in dev mode
if (process.env.NODE_ENV === 'development') {
  const requirePage = require.context('./pages', true, /\.ejs$/)
  requirePage.keys().forEach(requirePage)
  const requireCompView = require.context('./components', true, /\.ejs$/)
  requireCompView.keys().forEach(requireCompView)
}

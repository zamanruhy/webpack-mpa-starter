import './assets/scss/main.scss'
import './assets/scss/some.postcss'
import { customElements, dataModal, dataCollapse } from './helpers/mpa'
import header from './components/header/header'
import styleguide from './components/styleguide/styleguide'

customElements()
dataModal()
dataCollapse()

// Components
header()
styleguide()

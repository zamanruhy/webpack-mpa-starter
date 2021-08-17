import './assets/scss/main.scss'
import { customElements } from './helpers/custom-elements'
import { dataModal, dataCollapse } from './helpers/data-attributes'
import header from './components/header/header'
import styleguide from './components/styleguide/styleguide'

customElements()
dataModal()
dataCollapse()

// Components
header()
styleguide()

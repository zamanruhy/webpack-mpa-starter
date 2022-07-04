import { customElement } from '@/utils'

import App from '@/components/common/App/App.svelte'
import Spinner from '@/components/common/Spinner.svelte'
import Hamburger from '@/components/common/Hamburger.svelte'
import ToTop from '@/components/common/ToTop.svelte'
import Button from '@/components/common/Button.svelte'
import Collapse from '@/components/common/Collapse.svelte'
// import { Swiper, SwiperSlide } from '@/components/common/swiper'
import { Tabs, TabList, Tab, TabPanel } from '@/components/common/tabs'
import Dialog from '@/components/common/Dialog.svelte'
import Drawer from '@/components/common/Drawer.svelte'
import Field from '@/components/common/Field.svelte'
import Input from '@/components/common/Input.svelte'
import FileInput from '@/components/common/FileInput.svelte'
import Checkbox from '@/components/common/Checkbox.svelte'
import Radio from '@/components/common/Radio.svelte'
import Switch from '@/components/common/Switch.svelte'

export function customElements() {
  document.addEventListener('DOMContentLoaded', () => {
    customElement('app-app', App)
    customElement('app-hamburger', Hamburger)
    customElement('app-drawer', Drawer)
    customElement('app-dialog', Dialog)
    customElement('app-button', Button)
    customElement('app-collapse', Collapse)
    // customElement('app-swiper', Swiper)
    // customElement('app-swiper-slide', SwiperSlide, { outside: true })
    customElement('app-tabs', Tabs)
    customElement('app-tab-list', TabList)
    customElement('app-tab', Tab)
    customElement('app-tab-panel', TabPanel)
    customElement('app-field', Field)
    customElement('app-input', Input)
    customElement('app-file-input', FileInput)
    customElement('app-checkbox', Checkbox)
    customElement('app-radio', Radio)
    customElement('app-switch', Switch)
    customElement('app-spinner', Spinner)
    customElement('app-to-top', ToTop)
  })
}

import { collapseAction } from '@/actions'

export function dataCollapse() {
  Array.from(document.querySelectorAll('[data-collapse]')).forEach((el) => {
    const options = {
      id: el.dataset.collapse,
      class: el.dataset.class
    }
    if (el.tagName.startsWith('APP-')) {
      el.action = (node) => collapseAction(node, options)
    } else {
      collapseAction(el, options)
    }
  })
}

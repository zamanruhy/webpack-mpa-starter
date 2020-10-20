import { customElement } from '@/utils'

import Test from '@/components/common/Test.svelte'
import Spinner from '@/components/common/Spinner.svelte'
import Hamburger from '@/components/common/Hamburger.svelte'
import ToTop from '@/components/common/ToTop.svelte'
import Button from '@/components/common/Button.svelte'
import Collapse from '@/components/common/Collapse.svelte'
import { Swiper, SwiperSlide } from '@/components/common/swiper'
import LazyImage from '@/components/common/LazyImage.svelte'
import { Tabs, TabList, Tab, TabPanel } from '@/components/common/tabs'
import Modal from '@/components/common/Modal.svelte'
import Drawer from '@/components/common/Drawer.svelte'
import Input from '@/components/common/Input.svelte'
import FileInput from '@/components/common/FileInput.svelte'
import Checkbox from '@/components/common/Checkbox.svelte'
import Radio from '@/components/common/Radio.svelte'

export function customElements() {
  document.addEventListener('DOMContentLoaded', () => {
    customElement('Test', Test)
    customElement('Hamburger', Hamburger)
    customElement('Drawer', Drawer)
    customElement('Modal', Modal)
    customElement('Button', Button)
    customElement('Collapse', Collapse)
    customElement('Swiper', Swiper)
    customElement('SwiperSlide', SwiperSlide, { outside: true })
    customElement('LazyImage', LazyImage, { outside: true })
    customElement('Tabs', Tabs)
    customElement('TabList', TabList)
    customElement('Tab', Tab, { outside: true })
    customElement('TabPanel', TabPanel)
    customElement('Input', Input)
    customElement('FileInput', FileInput)
    customElement('Checkbox', Checkbox)
    customElement('Radio', Radio)
    customElement('Spinner', Spinner)
    customElement('ToTop', ToTop)
  })
}

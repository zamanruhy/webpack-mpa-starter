import { collapse, modal } from '@/actions'

export function dataModal() {
  Array.from(document.querySelectorAll('[data-modal]')).forEach((el) => {
    const id = el.dataset.modal

    if (el.tagName.startsWith('APP-')) {
      el.use = el.use || []
      el.use.push([modal, id])
    } else {
      modal(el, id)
    }
  })
}

export function dataCollapse() {
  Array.from(document.querySelectorAll('[data-collapse]')).forEach((el) => {
    const options = {
      id: el.dataset.collapse,
      class: el.dataset.class
    }
    if (el.tagName.startsWith('APP-')) {
      el.use = el.use || []
      el.use.push([collapse, options])
    } else {
      collapse(el, options)
    }
  })
}

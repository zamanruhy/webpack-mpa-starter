import { collapse, modal } from '@/actions'

// data-modal
Array.from(document.querySelectorAll('[data-modal]')).forEach((el) => {
  const id = el.dataset.modal

  if (el.tagName.startsWith('APP-')) {
    el.use = el.use || []
    el.use.push([modal, id])
    el.removeAttribute('data-modal')
  } else {
    modal(el, id)
  }
})

// data-collapse
Array.from(document.querySelectorAll('[data-collapse]')).forEach((el) => {
  const options = {
    id: el.dataset.collapse,
    class: el.dataset.class
  }
  if (el.tagName.startsWith('APP-')) {
    el.use = el.use || []
    el.use.push([collapse, options])
    el.removeAttribute('data-collapse')
    el.removeAttribute('data-class')
  } else {
    collapse(el, options)
  }
})

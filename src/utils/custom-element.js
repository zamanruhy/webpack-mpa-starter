import {
  camelize,
  hyphenate,
  dispatchEvent,
  createSlots,
  hasOwn
} from '@/utils'

export default function customElement(
  name,
  Component,
  { outside = false, events = [] } = {}
) {
  const [, ...propsList] = Object.getOwnPropertyNames(Component.prototype)
  const attrsList = propsList.map(hyphenate)

  class SvelteElement extends HTMLElement {
    constructor() {
      super()
      this.component = null
      this.props = {}
      this.upgradeProps()
    }

    upgradeProps() {
      propsList.forEach((prop) => {
        if (hasOwn(this, prop)) {
          const value = this[prop]
          delete this[prop]
          this[prop] = value
        }
      })
    }

    handleAttributes() {
      if (this._attributesHandled) {
        return
      }

      this._attributesHandled = true

      for (const attribute of this.attributes) {
        let { name, value } = attribute

        if (name.startsWith('.')) {
          name = name.slice(1)
        }

        if (attrsList.includes(name)) {
          name = camelize(name)
          value = value === '' ? true : Number(value) || value
        } else {
          value = value === '' ? true : value
        }

        this.props[name] = value
      }
    }

    handleChildren() {
      if (this._childrenHandled) {
        return
      }

      this._childrenHandled = true

      const children = Array.from(this.childNodes)

      if (children.length === 0) {
        return
      }

      for (const child of [...children].reverse()) {
        this.removeChild(child)
      }

      const slots = {}
      for (const child of children) {
        const name =
          child.nodeType !== Node.ELEMENT_NODE || !child.hasAttribute('slot')
            ? 'default'
            : child.getAttribute('slot')
        slots[name] = (slots[name] || []).concat(child)
      }

      this.props.$$slots = createSlots(slots)
      this.props.$$scope = {}
    }

    get parentContext() {
      let el = this.parentElement

      do {
        if (el.context) return el.context
        el = el.parentElement
      } while (el !== null)

      return null
    }

    connectedCallback() {
      if (this.isConnected && !this.component) {
        this.mount()
      }
    }

    disconnectedCallback() {
      if (this.component) {
        this.destroy()
      }
    }

    mount() {
      this.context = new Map(this.parentContext || [])

      this.handleAttributes()
      this.handleChildren()

      window.__currentElement__ = this

      this.component = new Component({
        target: outside ? this.parentNode : this,
        anchor: outside ? this : null,
        props: this.props
      })

      delete window.__currentElement__

      events.forEach((event) => {
        this.component.$on(event, (e) => {
          this.dispatchEvent(e)
        })
      })

      dispatchEvent(this, 'mount')
    }

    destroy() {
      this.component.$destroy()
      this.component = null

      dispatchEvent(this, 'destroy')
    }
  }

  propsList.forEach((prop) => {
    Object.defineProperty(SvelteElement.prototype, prop, {
      get() {
        if (this.component) {
          return this.component[prop]
        } else {
          return this.props[prop]
        }
      },
      set(value) {
        this.props[prop] = value

        if (this.component) {
          this.component[prop] = value
        }
      }
    })
  })

  window.customElements.define(name, SvelteElement)
}

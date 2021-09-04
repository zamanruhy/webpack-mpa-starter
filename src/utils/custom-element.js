import { camelize, hyphenate, hasOwn } from '@/utils'

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
          value = value === '' ? true : isNaN(value) ? value : Number(value)
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
        if (el.__context__) return el.__context__
        el = el.parentElement
      } while (el !== null)

      return null
    }

    connectedCallback() {
      if (!this.component) {
        this.mount()
      }
    }

    async disconnectedCallback() {
      // wait to check if it's a move or a removal
      await Promise.resolve()
      if (!this.isConnected && this.component) {
        this.destroy()
      }
    }

    mount() {
      this.__context__ = new Map(this.parentContext || [])

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
          this.dispatchEvent(new CustomEvent(event, { detail: e.detail }))
        })
      })

      this.dispatchEvent(new CustomEvent('mount'))
    }

    destroy() {
      this.component.$destroy()
      this.component = null

      this.dispatchEvent(new CustomEvent('destroy'))
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
          this.component.$set({ [prop]: value })
        }
      }
    })
  })

  window.customElements.define(name, SvelteElement)
}

// eslint-disable-next-line import/first
import { detach, insert, noop } from 'svelte/internal'

function createSlots(slots) {
  const svelteSlots = {}

  for (const name in slots) {
    svelteSlots[name] = [createSlotFn(slots[name])]
  }

  return svelteSlots
}

function createSlotFn(nodes) {
  return () => {
    return {
      c: noop,
      m: function mount(target, anchor) {
        const frag = document.createDocumentFragment()
        nodes.forEach((node) => frag.appendChild(node))
        insert(target, frag, anchor)
      },
      d: function destroy(detaching) {
        if (detaching) {
          nodes.forEach((node) => detach(node))
        }
      },
      l: noop
    }
  }
}

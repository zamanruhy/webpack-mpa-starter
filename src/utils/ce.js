import { camelize } from '@/utils'
import { render } from 'solid-js/web'

export default function customElement(
  name,
  Component,
  { outside = false, attrsList = [] } = {}
) {
  // const [, ...propsList] = Object.getOwnPropertyNames(Component.prototype)
  // const attrsList = propsList.map(hyphenate)

  const propsList = attrsList.map(camelize)
  // const attrsList = propsList.map(hyphenate)

  class SolidElement extends HTMLElement {
    constructor() {
      super()
      this.component = null
      this.mounted = false
      this.props = {}
      this.upgradeProps()
    }

    upgradeProps() {
      propsList.forEach((prop) => {
        if (Object.prototype.hasOwnProperty.call(this, prop)) {
          const value = this[prop]
          delete this[prop]
          this.props[prop] = value
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

      // const slots = {}
      for (const child of children) {
        const name =
          child.nodeType !== Node.ELEMENT_NODE || !child.hasAttribute('slot')
            ? 'children'
            : child.getAttribute('slot')
        this.props[name] = (this.props[name] || []).concat(child)
      }

      // this.props.$$slots = createSlots(slots)
      // this.props.$$scope = {}
    }

    // get parentContext() {
    //   let el = this.parentElement

    //   do {
    //     if (el.__context__) return el.__context__
    //     el = el.parentElement
    //   } while (el !== null)

    //   return []
    // }

    connectedCallback() {
      if (!this.component) {
        this.mount()
      }
    }

    async disconnectedCallback() {
      // // wait to check if it's a move or a removal
      // await Promise.resolve()
      // if (!this.isConnected && this.component) {
      //   this.destroy()
      // }
    }

    mount() {
      // this.__context__ = new Map(this.parentContext)

      this.handleAttributes()
      this.handleChildren()

      // window.__currentElement__ = this

      // this.component = {}

      // this.component = new Component({
      //   target: outside ? this.parentNode : this,
      //   anchor: outside ? this : null,
      //   props: this.props
      // })

      render(
        () => <Component {...this.props} />,
        outside ? this.parentNode : this
      )

      // delete window.__currentElement__

      this.dispatchEvent(new CustomEvent('mount'))
    }

    destroy() {
      // this.component.$destroy()
      // this.component = null

      while (this.firstChild) {
        this.removeChild(this.firstChild)
      }

      this.dispatchEvent(new CustomEvent('destroy'))
    }
  }

  if (!window.customElements.get(name)) {
    window.customElements.define(name, SolidElement)
  }
}

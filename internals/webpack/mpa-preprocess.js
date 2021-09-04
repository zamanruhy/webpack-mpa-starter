const path = require('path')

module.exports = function mpaPreprocess() {
  return {
    script({ content }) {
      if (/\bsetContext\(/.test(content)) {
        content = content.replace(/\bsetContext\(/g, '_setContext(')

        content = `${content}
        function _setContext(key, value) {
          setContext(key, value)

          if (window.__currentElement__) {
            window.__currentElement__.__context__.set(key, value)
          }
        }`

        return {
          code: content
        }
      } else if (/\bgetContext\(/.test(content)) {
        content = content.replace(/\bgetContext\(/g, '_getContext(')

        content = `${content}
        function _getContext(key) {
          return getContext(key) ?? window.__currentElement__.__context__.get(key)
        }`

        return { code: content }
      }
    },
    style({ content, filename }) {
      const { name } = path.parse(filename)

      if (comps.includes(name)) {
        return {
          code: content + styles[name]
        }
      }
    }
  }
}

const styles = {
  Modal: `
  app-modal:defined {
    display: contents;
  }

  app-modal:not(:defined) {
    display: none;
  }`,

  Drawer: `
  app-drawer:defined {
    display: contents;
  }

  app-drawer:not(:defined) {
    display: none;
  }`,

  Button: `
  app-button:defined {
    display: contents;
  }

  app-button:not(:defined) {
    @extend .button;

    &[variant='primary'] {
      @extend .button_primary;
    }

    &[size='small'] {
      @extend .button_small;
    }

    &[size='large'] {
      @extend .button_large;
    }
  }

  app-file-input:not(:defined) {
    &:after {
      @extend .button;
      @extend .button_primary;
    }
  }`,

  Input: `
  app-input:defined {
    display: contents;
  }

  app-input:not(:defined) {
    display: block;

    &:after {
      @extend .input__control;
      content: '';
      display: block;
    }
  }

  app-file-input:not(:defined) {
    &:before {
      @extend .input__control;
    }
  }`,

  FileInput: `
  app-file-input:defined {
    display: contents;
  }

  app-file-input:not(:defined) {
    @extend .file-input__field;

    &:before {
      @extend .file-input__input;
      content: '';
      display: block;
    }
    &:after {
      @extend .file-input__button;
      content: 'Browse';
    }
  }`,

  Checkbox: `
  app-checkbox:defined {
    display: contents;
  }

  app-checkbox:not(:defined) {
    @extend .checkbox;

    &:before {
      @extend .checkbox__box;
      content: '';
    }
    &:not([label]):before {
      top: 0;
    }
    &[label]:after {
      @extend .checkbox__label;
      content: attr(label);
    }
  }`,

  Radio: `
  app-radio:defined {
    display: contents;
  }

  app-radio:not(:defined) {
    @extend .radio;

    &:before {
      @extend .radio__box;
      content: '';
    }
    &:not([label]):before {
      top: 0;
    }
    &[label]:after {
      @extend .radio__label;
      content: attr(label);
    }
  }`,

  Collapse: `
  app-collapse:defined {
    display: contents;
  }

  app-collapse:not(:defined) {
    display: block;

    &:not([visible]) {
      display: none;
    }
  }`,

  Hamburger: `
  app-hamburger:defined {
    display: contents;
  }

  app-hamburger:not(:defined) {
    @extend .hamburger;
    align-items: stretch;

    &:before,
    &:after {
      all: unset;
      content: '';
      display: block;
      height: var(--hamburger-bar-height);
      border-radius: var(--hamburger-bar-radius);
      background-color: var(--hamburger-color);
    }
    &:before {
      box-shadow: 0 var(--hamburger-bar-offset) var(--hamburger-color);
    }
  }`,

  Swiper: `
  app-swiper:defined {
    display: contents;
  }

  app-swiper-slide:defined {
    display: none;
  }

  app-swiper:not(:defined) {
    display: flex;
    overflow: hidden;
    margin: 0 auto;

    > [slot] {
      display: none;
    }
  }

  app-swiper-slide:not(:defined) {
    display: block;
    flex: none;
    width: 100%;
  }`,

  Tabs: `
  app-tabs:defined,
  app-tab-list:defined,
  app-tab:defined,
  app-tab-panel:defined {
    display: contents;
  }

  app-tabs:not(:defined) {
    display: block;
  }
  app-tab-list:not(:defined) {
    @extend .tabs__list;
  }
  app-tab:not(:defined) {
    @extend .tabs__tab;

    &:nth-of-type(1) {
      @extend .tabs__tab_active;
    }
  }
  app-tab-panel:not(:defined) {
    @extend .tabs__panel;

    &:nth-of-type(1) {
      @extend .tabs__panel_active;
    }
  }`
}

const comps = Object.keys(styles)

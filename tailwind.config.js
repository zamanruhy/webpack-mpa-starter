/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['src/**/*.{html,js,jsx,svelte}'],
  theme: {
    extend: {
      fontFamily: {
        brand: ['OpenSans', ...defaultTheme.fontFamily.sans]
      },
      minHeight: defaultTheme.height,
      minWidth: defaultTheme.width,
      zIndex: {
        fixed: 1100,
        backdrop: 1200,
        modal: 1300,
        popup: 1400
      }
    }
  },
  corePlugins: {
    container: false
  },
  plugins: []
}

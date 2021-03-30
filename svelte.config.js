module.exports = {
  preprocess: require('svelte-preprocess')({
    scss: {
      prependData: ['functions', 'variables', 'mixins']
        .map((file) => `@import "./src/assets/scss/_${file}.scss";\n`)
        .join('')
    }
  })
}

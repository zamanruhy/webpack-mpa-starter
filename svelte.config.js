module.exports = {
  preprocess: require('svelte-preprocess')({
    scss: {
      prependData: '@use "./src/assets/scss/_globals.scss" as *;'
    }
  })
}

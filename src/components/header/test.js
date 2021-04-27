require('svelte/register')

const App = require('./Icon.svelte').default

const { html } = App.render({})

console.log(html)

module.exports.html = html

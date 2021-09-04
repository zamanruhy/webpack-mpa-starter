module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  overrides: [
    {
      files: ['*.js'],
      extends: ['standard', 'plugin:prettier/recommended']
    },
    {
      files: ['**/*.svelte'],
      plugins: ['svelte3'],
      processor: 'svelte3/svelte3',
      settings: {
        'svelte3/ignore-styles': () => true
      }
    }
  ]
}

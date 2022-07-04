module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true
  },
  // parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    parser: '@babel/eslint-parser',
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  rules: {
    eqeqeq: 'error',
    'no-unused-vars': 'off'
  },
  overrides: [
    {
      files: ['*.svelte'],
      plugins: ['svelte3'],
      processor: 'svelte3/svelte3',
      settings: {
        'svelte3/ignore-styles': () => true
      }
    }
  ]
}

module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
    jest: true
  },
  extends: ['standard', 'plugin:prettier/recommended'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  plugins: ['svelte3'],
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'func-names': ['warn', 'always']
  },
  overrides: [
    {
      files: ['**/*.svelte'],
      processor: 'svelte3/svelte3'
    }
  ]
}

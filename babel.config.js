module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        loose: false,
        useBuiltIns: 'usage',
        corejs: 3,
        debug: false
      }
    ]
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties'
  ],
  env: {
    test: {
      presets: [['@babel/preset-env', { targets: { node: 'current' } }]]
    }
  }
}

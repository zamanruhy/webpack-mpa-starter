module.exports = {
  moduleFileExtensions: ['js', 'json', 'svelte'],
  transform: {
    '^.+\\.svelte$': require.resolve('jest-transform-svelte'),
    '^.+\\.js$': require.resolve('babel-jest')
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  transformIgnorePatterns: ['node_modules'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '.+\\.(css|scss|png|jpe?g|gif|svg|webp|woff2?)$': 'identity-obj-proxy'
  },
  testMatch: ['**/tests/unit/**/*.spec.js', '**/__tests__/*.js'],
  testURL: 'http://localhost/',
  watchPlugins: [
    require.resolve('jest-watch-typeahead/filename'),
    require.resolve('jest-watch-typeahead/testname')
  ],
  collectCoverage: false,
  coverageDirectory: '<rootDir>/tests/unit/coverage',
  collectCoverageFrom: ['src/components/common/**/*.{svelte}'],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 75,
      lines: 75,
      statements: -15
    }
  }
}

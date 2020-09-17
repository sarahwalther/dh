module.exports = {
  env: {
    browser: true,
    es6: true,
    jasmine: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'standard',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'jasmine',
  ],
  rules: {
    'no-use-before-define': [0],
    '@typescript-eslint/no-use-before-define': [1],
    'comma-dangle': ['error', 'always-multiline'],
  },
}

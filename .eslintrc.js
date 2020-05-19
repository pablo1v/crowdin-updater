module.exports = {
  extends: ['airbnb-base', 'eslint:recommended', 'plugin:prettier/recommended'],
  plugins: ['import', 'prettier'],
  env: {
    node: true,
    es6: true,
    jest: true,
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2019,
  },
  rules: {
    'prettier/prettier': 'error',
    'no-console': 'off',
  },
};

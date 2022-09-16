module.exports = {
  env: {
    browser: true,
    amd: true,
    node: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    '@typescript-eslint/no-var-requires': 0,
    'no-mixed-spaces-and-tabs': 2,
    'offsetTernaryExpressions': 0,
    'indent': [2, 2],
    'camelcase': 0,
    'curly': 2,
    'func-style': [2, 'expression'],
    'no-var': 2,
    'prefer-const': 2,
    'semi': 1,
    'no-extra-semi': 2,
    'brace-style': [2, '1tbs', { 'allowSingleLine': true }],
    'semi-spacing': 1,
    'key-spacing': 1,
    'block-spacing': 1,
    'comma-spacing': 1,
    'no-multi-spaces': 1,
    'space-before-blocks': 1,
    'keyword-spacing': [1, { 'before': true, 'after': true }],
    'space-infix-ops': 1,
    'comma-style': [2, 'last'],
    'quotes': [1, 'single']
  },
};

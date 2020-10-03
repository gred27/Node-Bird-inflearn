module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['airbnb', 'prettier/react', 'plugin:prettier/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['react', 'import', 'react-hooks', 'prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'no-underscoe-dangle': 'off',
    'no-console': 'off',
    'jsx-a11y/anchor-is-vaild': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'react/forbid-prop-types': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-indent': ['error', 2],
    'jsx-a11y/anchor-is-valid': 'off',
    'no-param-reassign': 'off',
    'no-unused-vars': 'off',
    'react/jsx-filename-extension': 'off',
    'consistent-return': 'off',
  },
};

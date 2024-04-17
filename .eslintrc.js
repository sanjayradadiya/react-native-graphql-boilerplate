module.exports = {
  root: true,
  extends: '@react-native',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  parser: 'babel-eslint',
  rules: {
    'object-curly-spacing': ['error', 'always'],
    'no-undef': ['error'],
    'react-native/no-inline-styles': 2,
    'react-native/no-unused-styles': 2,
    'react-native/no-single-element-style-arrays': 2,
  },
};

module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'airbnb-typescript',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],
  rules: {
    'import/no-extraneous-dependencies': ['error', { packageDir: './' }],
    'import/prefer-default-export': [0],
    'no-nested-ternary': [0],
    'no-irregular-whitespace': [0],
    'consistent-return': [0],
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.tsx'] }],
    'react/prop-types': [0],
    'react/jsx-boolean-value': [0],
    'react/prefer-stateless-function': [0],
    'prettier/prettier': ['error', { singleQuote: true }],
    'prettier.printWidth': 120,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.native.js', '.ts', '.tsx', '.android.js', '.ios.js'],
      },
    },
  },
  overrides: [
    {
      files: ['**/*.test.js', '**/*.test.jsx', '**/*.test.tsx', 'jest.setup.js'],
      env: {
        jest: true,
      },
    },
  ],
};

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: 'airbnb',
  plugins: [
    '@typescript-eslint',
    'react',
    'jsx-a11y',
    'import',
    'prettier',
    'react-hooks',
  ],
  globals: {
    shallow: true,
    render: true,
    mount: true,
    it: true,
    window: true,
    __DEV__: true,
  },
  rules: {
    'import/no-unresolved': 0,
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'no-use-before-define': 'off',
    'react/jsx-props-no-spreading': 'off',
    'max-len': ['error', { code: 120 }],
    'no-console': 'off',
  },
};

module.exports = {
  env: {
    es2020: true,
    node: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'import/extensions': ['error', 'ignorePackages', {
      js: 'never',
      mjs: 'never',
      jsx: 'never',
      ts: 'never',
      tsx: 'never',
    }],
    'import/no-unresolved': 'off'
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ["src/**/*"],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};

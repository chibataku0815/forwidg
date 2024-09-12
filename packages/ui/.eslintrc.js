/** @type {import("biome").Config} */
module.exports = {
  root: true,
  extends: ['@repo/biome-config/react-internal.js'],
  parser: '@typescript-eslint/parser',
  rules: {
    'no-redeclare': 'off',
  },
};

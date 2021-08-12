module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-unused-vars": ["warn", { "args": "none" }],
    "quotes": ["warn", "double"]

  }
};
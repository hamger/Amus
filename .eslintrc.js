// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // add your custom rules here
  rules: {
    'generator-star-spacing': 'off',
    'no-new': 0,
    'no-useless-constructor': 0,
    indent: [2, 2],
    'no-tabs': 2,
    'operator-linebreak': ["error", "after"],
    'no-proto': 0
  }
}

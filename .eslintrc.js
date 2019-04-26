module.exports = {
  root: true,
  extends: 'standard',
  plugins: [
    'standard',
    'promise',
    'html',
    'react'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    node: true,
    mocha: true
  },
  rules: {
    'arrow-parens': 0,
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error'
  },
  globals: {
    __root: true,
    path: true,
    assert: true,
    expect: true,
    should: true
  }
}

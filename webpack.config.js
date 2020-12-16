function scriptRules() {
  return [
    {
      test: /\.(js|jsx)$/,
      exclude: [/node_modules/],
      loader: 'babel-loader'
    }
  ]
}

module.exports = {
  entry: ['./resources/app/index.js'],
  output: {
    filename: 'app.js',
    path: __dirname + '/public/'
  },
  module: {
    rules: scriptRules()
  }
}

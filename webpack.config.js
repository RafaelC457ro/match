function scriptRules() {
  return [
    {
      test: /\.js$/,
      exclude: [/node_modules/],
      loader: 'babel-loader',
      options: { presets: ['@babel/env', '@babel/preset-react'] }
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

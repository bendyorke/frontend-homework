import path from 'path'

exports.entry = ['./src/client/polyfills.js', './src/client']

exports.output = {
  filename: 'resources/public/bundle.js',
}

exports.module = {
  loaders: [
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    },
    {
      test: /\.css/,
      exclude: /node_nodules/,
      loader: 'style!css?modules&localIdentName=[name]_[local]_[hash:base64:5]!postcss',
    },
  ],
}

exports.resolve = {
  root: [
    path.resolve('./node_modules'),
    path.resolve('./src/client'),
  ],
}

exports.postcss = () => [
  require('autoprefixer'),
  require('postcss-nested'),
]

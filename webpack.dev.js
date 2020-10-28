const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const path = require('path')
const webpack = require('webpack')

const { PUBLIC_PATH = '/' } = process.env

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: '[name].js',
    publicPath: PUBLIC_PATH,
    path: path.join(__dirname, './dist'),
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    before(app) {
      if (PUBLIC_PATH !== '/') {
        app.get('/', function (_, res) {
          res.redirect(PUBLIC_PATH)
        })
      }
    },
    historyApiFallback: true,
    compress: true,
    watchOptions: {
      poll: 1000,
      ignored: /node_modules/,
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'thread-loader', 'css-loader'],
      },
    ],
  },
  plugins: [new webpack.ProgressPlugin()],
})

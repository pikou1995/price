const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:7001',
      },
    },
    watchOptions: {
      poll: 1000,
      ignored: /node_modules/,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './resources/index-dev.html',
    }),
  ],
})

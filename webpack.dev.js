const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const path = require('path')
const webpack = require('webpack')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:7001',
    //   },
    // },
    watchOptions: {
      poll: 1000,
      ignored: /node_modules/,
    },
  },
})

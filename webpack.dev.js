const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

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
    historyApiFallback: true,
    compress: true,
    watchOptions: {
      poll: 1000,
      ignored: /node_modules/,
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      ignoreOrder: true,
    }),
  ],
})

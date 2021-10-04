const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

const { PUBLIC_PATH = '/' } = process.env

module.exports = {
  entry: './resources/index.tsx',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './resources'),
    },
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        use: [
          'thread-loader',
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.PUBLIC_PATH': JSON.stringify(PUBLIC_PATH),
    }),
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: './resources/assets/',
      },
    ]),
    new HtmlWebpackPlugin({
      template: './resources/index.html',
      minify: true,
    }),
    new webpack.DllReferencePlugin({
      manifest: require('./dll/react-manifest.json'),
    }),
    new AddAssetHtmlPlugin([
      {
        filepath: './dll/*.js',
      },
    ]),
  ],
  stats: {
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false,
  },
}

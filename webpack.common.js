const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const { PUBLIC_PATH = '/' } = process.env

module.exports = {
  entry: './resources/index.tsx',
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
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
    new webpack.ProgressPlugin(),
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

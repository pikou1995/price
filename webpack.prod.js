const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MomentLocalesPlugin = require('moment-locales-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
      new OptimizeCssAssetsPlugin({}),
    ],
  },
  plugins: [
    new MomentLocalesPlugin({
      localesToKeep: ['zh-cn'],
    }),
  ],
})


if (process.env.analyze) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  module.exports.plugins.push(
    new BundleAnalyzerPlugin(),
  )
}
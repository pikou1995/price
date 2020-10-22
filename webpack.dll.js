const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  entry: {
    react: [
      'react',
      'react-dom',
      'redux',
      'react-redux',
      'react-router',
      'react-router-dom',
    ],
  },
  output: {
    filename: '[name]-[hash:6].dll.js',
    path: path.join(__dirname, '/dll/'),
    library: '[name][hash:6]',
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new webpack.DllPlugin({
      // manifest缓存文件的请求上下文（默认为webpack执行环境上下文）
      context: process.cwd(),
      // manifest.json文件的输出位置
      path: path.join(__dirname, '/dll/[name]-manifest.json'),
      // 定义打包的公共vendor文件对外暴露的函数名
      name: '[name][hash:6]',
    }),
  ],
}

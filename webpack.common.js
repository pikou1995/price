const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './resources/index.tsx',
  output: {
    filename: 'bundle.[hash:8].js',
    publicPath: '/',
    path: path.join(__dirname, './dist'),
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              experimentalWatchApi: true,
            },
          },
        ],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new CopyPlugin([{ from: './resources/assets' }]),
  ],
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-router-dom': 'ReactRouterDOM',
    'react-redux': 'ReactRedux',
    'redux-thunk': 'ReduxThunk',
    antd: 'antd',
    axios: 'axios',
    moment: 'moment',
    underscore: '_',
  },
}

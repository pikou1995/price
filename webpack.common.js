const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./resources/index.js",
  output: {
    filename: "bundle.[hash:8].js",
    path: path.join(__dirname, "./dist")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["css-loader"]
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
  ]
};

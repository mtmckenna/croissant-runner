var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  entry: "./app/js/app.js",
  output: {
    path: __dirname + '/dist',
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.js$/, exclude: /node_modules/, loader: "eslint-loader" },
      { test: /\.css$/, loader: "style!css" },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    template: 'app/html/index.html',
    favicon: 'app/html/favicon.ico',
    googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID
  })]
};

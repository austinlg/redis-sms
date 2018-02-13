var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, '../server/out/public');
var APP_DIR = path.resolve(__dirname, './');

var config = {
  entry: APP_DIR + '/App.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /(\.css|.scss)$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        }]
      },
      {
        test: /\.(jsx|js)?$/,
        use: [{
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            presets: ['react', 'es2015'] // Transpiles JSX and ES6
          }
        }]
      }
    ],
  }
};

module.exports = config;
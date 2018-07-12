const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const common = (require('../webpack.common.js'))({
  filename: '[name].[hash].js',
  assetname: '[name].[hash].[ext]',
  dirname: 'public',
  env: 'production'
});
const webpack = require('webpack');

module.exports = merge(common, {
  entry: {
    polyfills: "babel-polyfill"
  },
  module: {
    rules: [{
		  test: /\.js$/,
      //include: path.resolve(__dirname, 'src'),
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['babel-preset-env'],
          plugins: ["transform-runtime"],
          babelrc: false,
        }
      }
	  },
    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: [{
          loader: "css-loader",
          options: { minimize: true }
         }]
      })
    }]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
      allChunks: true
    }),
    new UglifyJSPlugin()
  ]
});
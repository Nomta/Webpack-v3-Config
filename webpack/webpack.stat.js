const merge = require('webpack-merge');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const common = (require('../webpack.common.js'))({
  filename: '[name].js',
  assetname: '[name].[ext]',
  dirname: 'dist'
});

module.exports = merge(common, {
  devtool: 'inline-source-map',
  output: {
    library: '[name]',
  },
  module: {
    rules: [{
		  test: /\.js$/,
      include: path.resolve(__dirname, '../src'),
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['babel-preset-env'],
          plugins: ['transform-runtime'],
          babelrc: false
        }
      }
	  },
    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: [{
          loader: "css-loader",
          options: { 
            minimize: false,
            sourceMap: true
          }
         }]
      })
    }]
  },
  plugins: [
    new ExtractTextPlugin('[name].css')
  ]
});
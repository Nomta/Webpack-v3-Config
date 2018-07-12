const webpack = require('webpack');
const merge = require('webpack-merge');
const common = (require('../webpack.common.js'))({
  filename: '[name].[hash:5].js',
  assetname: '[name].[hash:5].[ext]',
  dirname: '',
  env: 'development'
});

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './',
	port: 9000,
  //proxy: {
  //  '*': 'http://localhost:3000'
  //},
	hot: true
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    }]
  },
  plugins: [
	  new webpack.NamedModulesPlugin(),
	  new webpack.HotModuleReplacementPlugin(),
  ]
});
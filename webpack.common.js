const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = function(options) {
  
  return {
    entry: {
      app: './src/index.js'
      //common: ['./common', './libname']
    },
    output: {
      filename: options.filename,
      path: path.resolve(__dirname, options.dirname)
    },
    module: {
      rules: [{
	  	  test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'images/' + options.assetname
          }
        }]
	    }, {
	    	test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'assets/' + options.assetname
          }
        }]
	    }]
    },
    plugins: [
      new CleanWebpackPlugin(options.dirname),
      new HtmlWebpackPlugin({
        title: 'Webpack v3 Demo'
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        //chunks: ['app', 'polyfills']
      }),
      new webpack.DefinePlugin({                  // передает переменные непосредственно в код приложения
        NODE_ENV: JSON.stringify(options.env)     // usage: if (NODE_ENV === 'development') console.log(...)
      }),
      new webpack.NoEmitOnErrorsPlugin(),
      //new webpack.ProvidePlugin({
      //  _: 'lodash'
      //})
    ]
  }
};
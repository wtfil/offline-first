const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: './index.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'index.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
	test: /\.js$/,
	exclude: /node_modules/,
	loader: 'babel-loader',
	query: {
	  /*presets: ['es2015', 'react', 'stage-0'],*/
	  presets: ['react'],
	  /*plugins: ['transform-class-properties', 'transform-runtime', 'transform-decorators-legacy']*/
	}
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV':  JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ],
  devServer: {
    contentBase: './public',
    noInfo: true,
    inline: true,
    port: 9002
  }
};

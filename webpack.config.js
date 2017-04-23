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
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  module: {
    loaders: [
      {
	test: /\.js$/,
	exclude: /node_modules/,
	loader: 'babel-loader',
	query: {
	  presets: ['react', 'stage-0'],
	  plugins: ['transform-decorators-legacy']
	}
      }
    ]
  },
  devServer: {
    contentBase: './public',
    historyApiFallback: true,
    noInfo: true,
    inline: true,
    port: 9002
  }
};

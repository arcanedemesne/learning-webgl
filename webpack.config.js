const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode:'development',
  devServer: {
    contentBase: path.resolve(__dirname, '.'),
    hot: true
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    // your stuff
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg|mp4|mov|avi|mpeg?2)$/i,
        loader: 'file-loader'
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
};

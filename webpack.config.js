const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HappyPack = require('happypack');


module.exports = {
  mode: "production",
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.bundle.js'
  },
  optimization: {
    splitChunks: {
      chunks: "async",
      cacheGroups: {
        vendors: {
          test: /(react|react-dom)/,
          priority: -10
        }
      }
    }
  },
  devServer: {
    contentBase: './build',
    compress: true,
    open: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: 'happypack/loader?id=css',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'happypack/loader?id=js',
      }
    ]
  },
  plugins: [
    new HappyPack({
      id: 'js',
      loaders: ['babel-loader']
    }),
    new HappyPack({
      id: 'css',
      loaders: ['style-loader', 'css-loader']
    }),
    new ExtractTextWebpackPlugin({
      filename: 'index.css'
    }),
    new cleanWebpackPlugin(['./build']),
    new htmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,

      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new Visualizer({ filename: './status.html' })
  ]
}
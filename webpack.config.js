const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HappyPack = require('happypack');
const os = require('os');

const getIPAdress = () => {
  var interfaces = os.networkInterfaces();
  for(var devName in interfaces){
      var iface = interfaces[devName];
      for(var i=0;i<iface.length;i++){
          var alias = iface[i];
          if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
              return alias.address;
          }
      }
  }
}

module.exports = {
  mode: "production",
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /react|react-dom/,
          name:'vendor',
          chunks:'initial'
        }
      }
    }
  },
  devServer: {
    contentBase: './build',
    compress: true,
    open: true,
    hot: true,
    host: getIPAdress()
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
    // new ExtractTextWebpackPlugin({
    //   filename: 'index.css'
    // }),
    new cleanWebpackPlugin(['./build']),
    new htmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]
}
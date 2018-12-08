const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');


module.exports = {
    mode:"production",
    entry:path.resolve(__dirname,'src/index.js'),
    output:{
        path:path.resolve(__dirname,'build'),
        filename:'index.bundle.js'
    },
    devServer:{
        contentBase:'./build'
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    {loader:'style-loader'},
                    {loader:'css-loader'}
                ]
            },
            {
                test:/\.js$/,
                use:{
                    loader:'babel-loader'
                }
            }
        ]
    },
    plugins:[
        new cleanWebpackPlugin(['./build']),
        new htmlWebpackPlugin({
            template:'./src/index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new Visualizer({filename:'./status.html'})
    ]
}
var config = require('../config')
var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
var utils = require('./utils')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function(name) {
    baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
    module: {
        loaders: utils.styleLoaders({
            sourceMap: config.dev.cssSourceMap
        })
    },
    // eval-source-map is faster for development
    devtool: '#eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.dev.env
        }),
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        // extract css into its own file
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../src/index.html'),
            inject: 'body',
            hash:true,
            chunks:['global', 'index']
        }),
        new HtmlWebpackPlugin({
            filename: 'login.html',
            template: path.resolve(__dirname, '../src/login.html'),
            inject: 'body',
            hash:true,
            chunks:['global', 'login']
        }),
        new HtmlWebpackPlugin({
            filename: 'register.html',
            template: path.resolve(__dirname, '../src/register.html'),
            inject: 'body',
            hash: true,
            chunks:['global', 'register']
        }),
    ]
})
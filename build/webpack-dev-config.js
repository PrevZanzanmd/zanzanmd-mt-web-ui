var webpack = require('webpack')
var config = require('./webpack-base-config.js')

var webpackDevServer = require('webpack-dev-server')

new webpackDevServer(webpack(config), {
	contentBase: '../dist/',
}).listen(8097, 'localhost')
console.log('server run 8097')
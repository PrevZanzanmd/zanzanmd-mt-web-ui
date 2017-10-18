var htmlPlugin = require('html-webpack-plugin')
var webpack = require('webpack')
var resolve = require('path').resolve

module.exports = {
	entry: ["babel-polyfill", resolve(__dirname, '../src/main.js')],
	output: {
		path: resolve(__dirname, '../dist'),
		publicPath: '/',
		filename: '[name][hash].js'
		// filename: '[name].js'
	},
	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader!less-loader'
			},
			{
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                	publicPath: '/'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader'
            },
            {
            	test: /\.less$/,
            	loader: `style-loader!css-loader!less-loader`
            }
		]
	},
	plugins: [
		new htmlPlugin({
			template: resolve(__dirname, '../index.html')
		}),
		new webpack.LoaderOptionsPlugin({
		    minimize: true
		}),
		new webpack.optimize.UglifyJsPlugin({
	      compress: {
	        warnings: false
	      }
	    }),
	    new webpack.DefinePlugin({
		  "process.env": { 
		     NODE_ENV: JSON.stringify("production") 
		   }
		})
	],
	devtool: 'cheap-source-map'
}
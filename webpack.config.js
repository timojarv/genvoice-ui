const path = require("path");

module.exports = {
	entry: path.join(__dirname, 'src/index.js'),
	output: {
		path: path.join(__dirname, 'public/'),
		filename: 'bundle.js',
		publicPath: '/public/'
	},
	module: {
		loaders: [
			{
				test: /\.css$/,
				loader: 'style!css'
			},
			{
				test: /\.less$/,
				loader: 'style!css!less'
			},
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['latest', 'react', 'stage-0']
				}
			}
		]
	},
	colors: true,
	lessLoader: {
		lessPlugins: [
		]
	}
}
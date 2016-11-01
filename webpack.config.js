var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

var plugins = [];
var css_loader = 'css!postcss!sass';
if(process.env.NODE_ENV === 'production') {
	plugins = [
		new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
		new webpack.optimize.DedupePlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		})
	];
	css_loader = 'css?minimize!postcss!sass';
}

module.exports = [
	{
		entry: path.join(__dirname, 'script/index.jsx'),
		output: {
			filename: 'public/js/script.js'
		},
		resolve: {
			extensions: ['', '.jsx', '.js']
		},
		module: {
			loaders: [
				{
					test: /\.jsx?$/,
					loader: 'babel',
					query: {
						presets: ['es2015', 'react']
					},
					exclude: /node_modules/
				}
			]
		},
		plugins: plugins
	},
	{
		entry: path.join(__dirname, 'style/style.scss'),
		output: {
			path: path.join(__dirname, 'public/css'),
			filename: 'style.css'
		},
		resolve: {
			extensions: ['', '.scss']
		},
		module: {
			loaders: [
				{
					test: /\.scss$/,
					loader: ExtractTextPlugin.extract('style', css_loader)
				}
			]
		},
		plugins: [
			new ExtractTextPlugin('style.css')
		],
		postcss: [
			autoprefixer({
				browsers: ['last 2 versions', 'ie >= 9', 'Android >= 4', 'ios_saf >= 8']
			})
		]
	}
];

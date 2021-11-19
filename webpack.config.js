const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const isProduction = process.env.NODE_ENV == 'production';
const stylesHandler = 'style-loader';
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const config = {
	entry: './src/app.js',
	output: {
		path: path.resolve(__dirname, 'dist')
	},

	devServer: {
		open: true,
		host: 'localhost'
	},

	plugins: [
		new HtmlWebpackPlugin({
			title: 'Electra',
			filename: 'index.html',
			template: 'src/index.html',
			minify: true,
			chunks: ['main']
		}),

		new HtmlWebpackPlugin({
			inject: true,
			title: 'Invest | Electra',
			filename: 'invest.html',
			template: 'src/invest.html',
			minify: true,
			chunks: ['main']
		}),

		new BrowserSyncPlugin({
			host: 'localhost',
			port: 3000,
			proxy: 'localhost:8080'
		}),
		new FaviconsWebpackPlugin({
			logo: 'src/assets/favicon.png',
			cache: true,
			inject: true
		})
	],

	module: {
		rules: [
			{ test: /\.(js|jsx)$/i, loader: 'babel-loader' },
			{
				test: /\.s[ac]ss$/i,
				use: [
					stylesHandler,
					'css-loader',
					'postcss-loader',
					'sass-loader'
				]
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
				type: 'asset/resource'
			}
		]
	},

	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				extractComments: true,
				sourceMap: true,
				uglifyOptions: {
					warnings: false,
					parse: {},
					compress: true,
					mangle: true,
					output: null,
					toplevel: false,
					nameCache: null,
					ie8: false,
					keep_fnames: false
				},
				minify(file) {
					const extractedComments = [];
					const { error, map, code, warnings } =
						require('uglify-js').minify(file, { sourceMap: true });

					return { error, map, code, warnings, extractedComments };
				}
			})
		]
	}
};

module.exports = () => {
	config.mode = isProduction ? 'production' : 'development';
	return config;
};

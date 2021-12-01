const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const isProduction = process.env.NODE_ENV == 'production';
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const FileLoader = require('file-loader');

const config = {
	entry: './src/app.js',
	output: {
		path: path.resolve(__dirname, 'dist')
	},

	// devtool: 'source-map',
	devServer: {
		open: true,
		host: 'localhost'
	},

	plugins: [
		new MiniCssExtractPlugin(),

		new ImageMinimizerPlugin({
			minimizerOptions: {
				plugins: [
					['jpegtran', { progressive: true }],
					['optipng', { optimizationLevel: 5 }]
				]
			}
		}),

		new HtmlWebpackPlugin({
			title: 'Electra',
			filename: 'index.html',
			template: 'src/index.html',
			minify: true,
			minimizerOptions: {
				caseSensitive: true,
				collapseWhitespace: true,
				conservativeCollapse: true,
				keepClosingSlash: true,
				minifyCSS: true,
				minifyJS: true,
				removeComments: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true
			},
			chunks: ['main']
		}),

		// new HtmlWebpackPlugin({
		// 	inject: true,
		// 	title: 'Invest | Electra',
		// 	filename: 'invest.html',
		// 	template: 'src/invest.html',
		// 	minify: true,
		// 	minimizerOptions: {
		// 		caseSensitive: true,
		// 		collapseWhitespace: true,
		// 		conservativeCollapse: true,
		// 		keepClosingSlash: true,
		// 		minifyCSS: true,
		// 		minifyJS: true,
		// 		removeComments: true,
		// 		removeScriptTypeAttributes: true,
		// 		removeStyleLinkTypeAttributes: true
		// 	},
		// 	chunks: ['main']
		// }),

		new HtmlWebpackPlugin({
			inject: true,
			title: 'Get App | Electra',
			filename: 'apps.html',
			template: 'src/apps.html',
			minify: true,
			minimizerOptions: {
				caseSensitive: true,
				collapseWhitespace: true,
				conservativeCollapse: true,
				keepClosingSlash: true,
				minifyCSS: true,
				minifyJS: true,
				removeComments: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true
			},
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
		}),

		new CompressionPlugin(),
		new CopyPlugin({
			patterns: [{ from: 'src/form', to: 'form' }]
		})
	],

	module: {
		rules: [
			{
				test: /\.js$/,
				enforce: 'pre',
				use: ['source-map-loader']
			},
			{
				test: /\.(pdf)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]'
						}
					}
				]
			},
			{
				test: /.s?css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'sass-loader'
				]
			},
			{ test: /\.(js|jsx)$/i, loader: 'babel-loader' },
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				type: 'asset'
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
				type: 'asset/resource'
			}
		]
	},

	optimization: {
		mergeDuplicateChunks: false,
		minimize: true,
		moduleIds: 'deterministic',
		providedExports: true,
		removeAvailableModules: true,
		removeEmptyChunks: true,
		concatenateModules: true,
		minimizer: [
			new TerserPlugin({
				parallel: true,
				terserOptions: {
					compress: true,
					mangle: true,
					module: false
				}
			}),
			new CssMinimizerPlugin(),

			new UglifyJsPlugin({
				extractComments: true,
				sourceMap: true,
				uglifyOptions: {
					compress: true,
					mangle: true
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

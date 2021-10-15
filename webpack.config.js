const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";
const stylesHandler = "style-loader";

const config = {
	entry: "./src/app.js",
	output: {
		path: path.resolve(__dirname, "dist"),
	},

	devServer: {
		open: true,
		host: "localhost",
	},

	plugins: [
		new HtmlWebpackPlugin({
			title: "Electra",
			template: "src/index.html",
		}),

		new BrowserSyncPlugin({
			host: "localhost",
			port: 3000,
			proxy: "http://localhost:8080/",
		}),
	],

	module: {
		rules: [
			{ test: /\.(js|jsx)$/i, loader: "babel-loader" },
			{ test: /\.s[ac]ss$/i, use: [stylesHandler, "css-loader", "postcss-loader", "sass-loader"] },
			{ test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i, type: "asset/resource" },
		],
	},
};

module.exports = () => {
	config.mode = isProduction ? "production" : "development";
	return config;
};

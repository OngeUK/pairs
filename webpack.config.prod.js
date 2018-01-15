const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

const DIST_DIR = "./dist";

module.exports = {
	context: path.resolve(__dirname, "./src"),
	resolve: {
		extensions: [".jsx", ".js"]
	},

	// webpack entry point
	entry: {
		app: "./index.js"
	},

	// webpack output
	output: {
		filename: "bundle-[hash:5].js",
		path: path.resolve(__dirname, DIST_DIR)
	},

	// Plugin definitions
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),

		// Extract CSS to its own file
		new ExtractTextPlugin("styles-[contenthash:5].css"),

		// Create HTML file
		new HtmlWebpackPlugin({
			template: "./index.html" //,
			//favicon: "./../../assets/favicon.ico"
		}),

		new ScriptExtHtmlWebpackPlugin({
			defaultAttribute: "async"
		}),

		// Enable stylelint
		new StyleLintPlugin({
			syntax: "scss",
			failOnError: true
		}),

		new WorkboxPlugin({
			globDirectory: DIST_DIR,
			globPatterns: ["**/*.{html,js,css,svg,png}"],
			swDest: path.join(DIST_DIR, "sw.js")
		})
	],

	// Loaders
	module: {
		rules: [
			{
				// ESLint
				enforce: "pre",
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: "eslint-loader",
				options: {
					failOnError: true
				}
			},
			{
				// JS, using Babel
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			},
			{
				// CSS
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: ["css-loader", "postcss-loader", "sass-loader"]
				})
			},
			{
				// HTML
				test: /\.html$/,
				loader: "html-loader",
				options: {
					minimize: true
				}
			},
			{
				// Fonts
				test: /\.(woff|woff2)$/,
				loader: "file-loader",
				options: {
					name: "fonts/[name].[ext]"
				}
			},
			{
				// Images
				test: /\.(png|jpg|gif|svg)$/,
				use: [
					"file-loader?name=[path][name].[ext]",
					{
						loader: "img-loader",
						options: {
							gifsicle: {
								interlaced: false
							},
							mozjpeg: {
								quality: 85,
								progressive: true
							},
							optipng: true,
							pngquant: {
								floyd: 0.5,
								speed: 2
							},
							svgo: {
								plugins: [{removeTitle: true}, {convertPathData: false}]
							}
						}
					}
				]
			},
			{
				// Favicon
				test: /\.(ico)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[path][name].[ext]",
							publicPath: "/"
						}
					}
				]
			}
		]
	}
};

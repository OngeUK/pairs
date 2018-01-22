const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");
//const WorkboxPlugin = require("workbox-webpack-plugin");

const DIST_DIR = "./dist";

module.exports = {
	context: path.resolve(__dirname, "./src"),
	resolve: {
		extensions: [".jsx", ".js"]
	},

	// webpack entry points
	entry: {
		app: "./index.js",
		three: ["./libs/three/CanvasRenderer.js", "./libs/three/Projector.js", "./libs/three/bespoke-particles.js"]
	},

	// webpack output
	output: {
		filename: "scripts/[name]-[hash:5].js",
		path: path.resolve(__dirname, DIST_DIR)
	},

	// Plugin definitions
	plugins: [
		// Optimisation plugins
		new webpack.optimize.OccurrenceOrderPlugin(),
		new UglifyJSPlugin(),

		// Extract CSS to its own file
		new ExtractTextPlugin("styles-[contenthash:5].css"),

		// Create HTML file
		new HtmlWebpackPlugin({
			template: "./index.html",
			inject: false //,
			//favicon: "./../../assets/favicon.ico"
		}),

		new ScriptExtHtmlWebpackPlugin({
			defaultAttribute: "defer"
		}),

		// Enable stylelint
		new StyleLintPlugin({
			syntax: "scss",
			failOnError: true
		})

		// new WorkboxPlugin({
		// 	globDirectory: DIST_DIR,
		// 	globPatterns: ["**/*.{html,js,css,svg,png}"],
		// 	swDest: path.join(DIST_DIR, "sw.js")
		// })
	],

	// Loaders
	module: {
		rules: [
			{
				// ESLint
				enforce: "pre",
				test: /\.(js|jsx)$/,
				exclude: [/node_modules/, /libs/],
				loader: "eslint-loader",
				options: {
					failOnError: true
				}
			},
			{
				// JS, using Babel
				test: /\.(js|jsx)$/,
				exclude: [/node_modules/],
				loader: "babel-loader",
				options: {
					presets: ["env"]
				}
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
				// Fonts
				test: /\.(woff|woff2)$/,
				loader: "file-loader",
				options: {
					name: "fonts/[name].[ext]"
				}
			},
			{
				// Audio files
				test: /\.wav$/,
				loader: "file-loader",
				options: {
					name: "audio/[name].[ext]"
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
				// Favicon & JSON
				test: /\.(ico|json)$/,
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

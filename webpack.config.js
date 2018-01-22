const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");

module.exports = {
	context: path.resolve(__dirname, "./src"),
	resolve: {
		extensions: [".jsx", ".js"]
	},

	// webpack entry point
	entry: {
		app: "./index.js",
		three: ["./libs/three/CanvasRenderer.js", "./libs/three/Projector.js", "./libs/three/bespoke-particles.js"]
	},

	// webpack output
	output: {
		filename: "scripts/[name]-[hash:5].js",
		path: path.resolve(__dirname, "./dist")
	},

	// webpack development server
	devServer: {
		contentBase: path.resolve(__dirname, "./src"),
		// Overlay errors to the page
		overlay: {
			warnings: true,
			errors: true
		},
		// Keep console infomation to a miminal
		stats: "minimal"
	},

	// Enable sourcemaps
	devtool: "source-map",

	// Plugin definitions
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),

		// Extract CSS to its own file
		new ExtractTextPlugin("styles-[contenthash].css"),

		// Create HTML file
		new HtmlWebpackPlugin({
			template: "./index-dev.html" //,
			//inject: false //,
			//favicon: "./../../assets/favicon.ico"
		}),

		// Enable stylelint
		new StyleLintPlugin({
			syntax: "scss",
			failOnError: false
		}),

		// Prints more readable module names in the browser console on HMR updates
		new webpack.NamedModulesPlugin()
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
					failOnError: false
				}
			},
			{
				// JS, using Babel
				test: /\.(js|jsx)$/,
				exclude: [/node_modules/, /libs/],
				loader: "babel-loader"
			},
			{
				// CSS
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: ["css-loader", "postcss-loader"]
				})
			},
			{
				// SASS
				test: /\.(sass|scss)$/,
				use: [
					{
						loader: "style-loader",
						options: {
							sourceMap: true
						}
					},
					{
						loader: "css-loader",
						options: {
							sourceMap: true
						}
					},
					{
						loader: "postcss-loader",
						options: {
							sourceMap: true
						}
					},
					{
						loader: "sass-loader",
						options: {
							sourceMap: true
						}
					}
				]
			},
			{
				// HTML
				test: /\.html$/,
				loader: "html-loader"
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
				// Fonts
				test: /\.(woff|woff2|)$/,
				loader: "file-loader",
				options: {
					name: "fonts/[name].[ext]"
				}
			},
			{
				// Audo files
				test: /\.wav$/,
				loader: "file-loader",
				options: {
					name: "audio/[name].[ext]"
				}
			},
			{
				// Favicon
				test: /\.ico$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "images/[name].[ext]",
							publicPath: "/"
						}
					}
				]
			}
		]
	}
};

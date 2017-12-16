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
		app: "./js/app"
	},

	// webpack output
	output: {
		filename: "bundle-[hash].js",
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
			template: "./index.html" //,
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
				exclude: /node_modules/,
				loader: "eslint-loader",
				options: {
					failOnError: false
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
					{
						loader: "url-loader",
						options: {
							limit: 10000,
							name: "images/[name].[ext]",
							publicPath: "/"
						}
					}
				]
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

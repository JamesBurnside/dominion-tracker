const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const srcDir = path.join("..","src");

module.exports = {
	entry: {
		// Chrome extension entry points
		// popup: path.join(__dirname, srcDir, "popup.ts"),
		// options: path.join(__dirname, srcDir + 'options.ts'),
		// background: path.join(__dirname, srcDir + 'background.ts'),
		contentScript: path.join(__dirname, srcDir, "contentScript.ts"),

		// Custom entry points
		"custom-web-components": path.join(__dirname, srcDir, "web-components", "index.ts")
	},
	output: {
		path: path.join(__dirname, "../dist/js"),
		filename: "[name].js"
	},
	optimization: {
		splitChunks: {
			name: "vendor",
			chunks: "initial"
		}
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js"],
		alias: {
			src: path.resolve(__dirname, srcDir),

			// Allow for absolute imports
			"@types": path.resolve(__dirname, srcDir, "@types"),
			"game-manager": path.resolve(__dirname, srcDir, "game-manager"),
			"log-parser": path.resolve(__dirname, srcDir, "log-parser"),
			"logger": path.resolve(__dirname, srcDir, "logger"),
			"observers": path.resolve(__dirname, srcDir, "observers"),
			"player-parser": path.resolve(__dirname, srcDir, "player-parser"),
			"utils": path.resolve(__dirname, srcDir, "utils"),
		},
	},
	plugins: [
		// exclude locale files in moment
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
		new CopyPlugin({
			patterns: [{ from: ".", to: "../", context: "public" }],
			options: {}
		}),
	]
};
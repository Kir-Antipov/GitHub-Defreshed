const path = require("path");
const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const metadata = `// ==UserScript==
// @name         GitHub Defreshed
// @namespace    GitHub
// @version      1.0
// @description  Make GitHub Great Again!
// @author       Kir_Antipov
// @match        http*://github.com/*
// ==UserScript==`;

module.exports = {
    mode: "production",
    entry: "./src/index.js",
    output: {
        filename: "github-defreshed.user.js",
        path: path.resolve(__dirname, "build"),
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    output: {
                        beautify: false,
                        preamble: metadata,
                    },
                },
            }),
        ],
    },
    plugins: [
        new webpack.BannerPlugin({
            raw: true,
            banner: metadata,
            entryOnly: true
        }),

        new CleanWebpackPlugin()
    ]
};
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const CreateFileWebpack = require("create-file-webpack");
const RemoveFilesPlugin = require("remove-files-webpack-plugin");
const { name, namespace, displayName, version, author, description, githubUser, githubRepo, license } = require("./package.json");

const metadata = `// ==UserScript==
// @name         ${displayName}
// @namespace    ${namespace}
// @version      ${version}
// @author       ${author}
// @description  ${description}
// @license      ${license}
// @homepageURL  https://github.com/${githubUser}/${githubRepo}
// @updateURL    https://raw.githubusercontent.com/${githubUser}/${githubRepo}/master/build/${name}.meta.js
// @downloadURL  https://raw.githubusercontent.com/${githubUser}/${githubRepo}/master/build/${name}.user.js
// @supportURL   https://github.com/${githubUser}/${githubRepo}/issues/new/choose
// @match        https://github.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==`;

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: `${name}.user.js`,
        path: path.resolve(__dirname, "build"),
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    output: {
                        beautify: false,
                        preamble: metadata,
                    },
                },
            }),
        ],
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        plugins: ["@babel/plugin-transform-react-jsx"]
                    }
                }
            },
            {
                test: /\.jsx$/,
                use: [
                    {
                        loader: "imports-loader",
                        options: {
                            imports: [
                                "default dom-chef React",
                            ],
                        },
                    },
                ],
            }
        ],
    },
    resolve: {
        extensions: ["*", ".js", ".jsx"],
    },
    plugins: [
        new RemoveFilesPlugin({
            before: {
                include: [
                    path.resolve(__dirname, "build")
                ]
            }
        }),
        new CreateFileWebpack({
            fileName: `${name}.meta.js`,
            path: path.resolve(__dirname, "build"),
            content: metadata
        })
    ]
};
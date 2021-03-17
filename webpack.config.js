// Built-in modules
const path = require("path");
const fs = require("fs/promises");

// Metadata
const { name } = require("./package.json");
const addonManifest = require("./metadata/addon.manifest");
const userscriptManifest = require("./metadata/userscript.manifest");

// Plugins
const TerserPlugin = require("terser-webpack-plugin");
const EmitFilePlugin = require("emit-file-webpack-plugin");
const RemoveFilesPlugin = require("remove-files-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const ZipPlugin = require("zip-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { DefinePlugin } = require("webpack");

const isRelease = mode => mode === "production";
const isDebug = mode => !isRelease(mode);

module.exports = (_, { mode }) => ({
    entry: {
        main: "./src/index.ts",

        popup_js: "./src/ui/popup/index.tsx",
        popup_css: "./src/ui/styles/popup.scss",
    },
    output: {
        filename: (data) => {
            switch (data.chunk.name) {
                case "main":
                    return `${name}.user.js`;
                case "popup_js":
                    return "./popup/index.js";
                case "popup_css":
                    return "./popup/index";
            }
            throw new RangeError(`I don't know who are you, ${data.chunk.name}`);
        },
        path: path.resolve(__dirname, "build"),
    },
    devtool: false,
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                exclude: [/\.meta\.js$/],
                extractComments: false,
                terserOptions: {
                    mangle: isRelease(mode),
                    output: {
                        beautify: isDebug(mode),
                        preamble: userscriptManifest.toString(),
                    }
                }
            })
        ]
    },
    module: {
        rules: [
            {
                test: /popup.scss$/,
                use: MiniCssExtractPlugin.loader,
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "css-loader",
                        options: {
                            url: false,
                        },
                    },
                    "sass-loader",
                ],
            },
            {
                test: /\.ts(x?)$/,
                exclude: [/node_modules/, /test[/\\]/],
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            plugins: [
                                ["@babel/plugin-transform-react-jsx", { runtime: "automatic" }],
                            ],
                        },
                    },
                    {
                        loader: "ts-loader",
                    },
                ],
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            plugins: [
                                ["@babel/plugin-transform-react-jsx", { runtime: "automatic" }],
                            ],
                        },
                    },
                    {
                        loader: "react-svg-loader",
                        options: {
                            jsx: true,
                        }
                    },
                ],
            },
        ]
    },
    resolve: {
        extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
        plugins: [
            new TsconfigPathsPlugin()
        ],
        alias: {
            react: "jsx-dom"
        },
    },
    plugins: [
        new DefinePlugin({
            IS_DEBUG: isDebug(mode),
        }),
        new MiniCssExtractPlugin({
            filename: (data) => {
                switch (data.chunk.name) {
                    case "popup_css":
                        return "./popup/index.css";
                }
                throw new RangeError(`I don't know who are you, ${data.chunk.name}`);
            }
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "ui", "popup", "index.html"),
            filename: "./popup/index.html",
            inject: false,
        }),
        new EmitFilePlugin({
            filename: `${name}.meta.js`,
            content: userscriptManifest.toString(),
        }),
        new EmitFilePlugin({
            filename: `manifest.json`,
            content: addonManifest
        }),
        ...Object.keys(addonManifest.icons).map(size =>
            new EmitFilePlugin({
                path: "./icons",
                filename: `icon-${size}.png`,
                content: fs.readFile(path.resolve(__dirname, "media", `icon-${size}.png`))
            })
        ),
        new ZipPlugin({
            filename: `${name}`,
            extension: "xpi",
            exclude: [
                /\.meta\.js$/,
                /[/\\][^\.]*$/,
            ]
        }),
        new RemoveFilesPlugin({
            before: {
                include: [
                    path.resolve(__dirname, "build")
                ]
            },
            after: {
                root: path.resolve(__dirname, "build"),
                include: [
                    "manifest.json",
                    "popup",
                    "icons",
                ],
            }
        })
    ]
});

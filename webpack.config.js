const path = require("path");
const { EOL } = require("os");
const fs = require("fs/promises");
const TerserPlugin = require("terser-webpack-plugin");
const EmitFilePlugin = require("emit-file-webpack-plugin");
const RemoveFilesPlugin = require("remove-files-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const ZipPlugin = require("zip-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { name, namespace, displayName, version, author, description, githubUser, githubRepo, license } = require("./package.json");

function transformMetadata(metadata) {
    const maxLength = (Object.keys(metadata).map(x => x.length).sort((a, b) => b - a)[0] || 0) + 6;

    return [
        "// ==UserScript==",
        ...Object
            .entries(metadata)
            .map(([key, value]) => `// @${key}`.padEnd(maxLength, " ") + value),
        "// ==/UserScript=="
    ].join(EOL);
}

const metadata = {
    name: displayName,
    namespace,
    version,
    author,
    description,
    license,
    homepageURL: `https://github.com/${githubUser}/${githubRepo}`,
    updateURL: `https://raw.githubusercontent.com/${githubUser}/${githubRepo}/master/build/${name}.meta.js`,
    downloadURL: `https://raw.githubusercontent.com/${githubUser}/${githubRepo}/master/build/${name}.user.js`,
    supportURL: `https://github.com/${githubUser}/${githubRepo}/issues/new/choose`,
    match: `https://github.com/*`,
    "run-at": `document-start`,
    grant: `none`
};

const manifest = {
    manifest_version: 2,
    name: displayName,
    description,
    version,
    author,
    homepage_url: metadata.homepageURL,
    icons: {
        19: "icons/icon-19.png",
        38: "icons/icon-38.png",
        48: "icons/icon-48.png",
        96: "icons/icon-96.png",
    },
    content_scripts: [
        {
            matches: ["https://github.com/*"],
            all_frames: true,
            run_at: "document_start",
            js: [`${name}.user.js`]
        }
    ],
    browser_action: {
        default_title: displayName,
        default_icon: {
            19: "icons/icon-19.png",
            38: "icons/icon-38.png",
        },
        default_popup: "popup/index.html",
    },
    permissions: ["storage"],
    applications: {
        gecko: {
            id: "{7945c276-9007-400b-b174-70db1146af7e}"
        }
    }
};

module.exports = {
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
    optimization: {
        minimizer: [
            new TerserPlugin({
                exclude: [/\.meta\.js$/],
                terserOptions: {
                    output: {
                        beautify: false,
                        preamble: transformMetadata(metadata),
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
                                ["@babel/plugin-transform-react-jsx", { pragma: "h", pragmaFrag: "Fragment" }],
                            ],
                        },
                    },
                    {
                        loader: "imports-loader",
                        options: {
                            imports: [
                                "named jsx-dom h",
                                "named jsx-dom Fragment",
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
                                ["@babel/plugin-transform-react-jsx", { pragma: "h" }],
                            ],
                        },
                    },
                    {
                        loader: "imports-loader",
                        options: {
                            imports: [
                                "named jsx-dom h",
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
            content: transformMetadata(metadata)
        }),
        new EmitFilePlugin({
            filename: `manifest.json`,
            content: manifest
        }),
        ...Object.keys(manifest.icons).map(size =>
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
};
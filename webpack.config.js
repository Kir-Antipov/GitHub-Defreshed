const path = require("path");
const { EOL } = require("os");
const fs = require("fs/promises");
const TerserPlugin = require("terser-webpack-plugin");
const EmitFilePlugin = require("emit-file-webpack-plugin");
const RemoveFilesPlugin = require("remove-files-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const ZipPlugin = require("zip-webpack-plugin");
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
        48: "icons/icon-48.png",
        96: "icons/icon-96.png"
    },
    content_scripts: [
        {
            matches: ["https://github.com/*"],
            all_frames: true,
            run_at: "document_start",
            js: [`${name}.user.js`]
        }
    ],
    options_ui: {
        page: "options.html"
    },
    permissions: ["storage"],
    applications: {
        gecko: {
            id: "{7945c276-9007-400b-b174-70db1146af7e}"
        }
    }
};

module.exports = {
    entry: "./src/index.ts",
    output: {
        filename: `${name}.user.js`,
        path: path.resolve(__dirname, "build")
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
                test: /\.scss$/,
                use: [
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.ts(x?)$/,
                exclude: [/node_modules/, /test/],
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            plugins: ["@babel/plugin-transform-react-jsx"]
                        }
                    },
                    {
                        loader: "imports-loader",
                        options: {
                            imports: ["default jsx-dom React"]
                        }
                    },
                    {
                        loader: "ts-loader"
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
        plugins: [
            new TsconfigPathsPlugin()
        ]
    },
    plugins: [
        new EmitFilePlugin({
            filename: `${name}.meta.js`,
            content: transformMetadata(metadata)
        }),
        new EmitFilePlugin({
            filename: `manifest.json`,
            content: manifest
        }),
        new EmitFilePlugin({
            filename: `options.html`,
            content: `<body onload="location.href='https://github.com/settings/profile'"/>`
        }),
        new EmitFilePlugin({
            path: "./icons",
            filename: `icon-48.png`,
            content: fs.readFile(path.resolve(__dirname, "media", "icon-48.png"))
        }),
        new EmitFilePlugin({
            path: "./icons",
            filename: `icon-96.png`,
            content: fs.readFile(path.resolve(__dirname, "media", "icon-96.png"))
        }),
        new ZipPlugin({
            filename: `${name}`,
            extension: "xpi",
            exclude: [/\.meta\.js$/]
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
                    "options.html",
                    "icons"
                ]
            }
        })
    ]
};
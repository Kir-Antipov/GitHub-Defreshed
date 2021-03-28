const { EOL } = require("os");
const {
    name,
    namespace,
    displayName,
    version,
    author,
    description,
    githubUser,
    githubRepo,
    license,
} = require("../package.json");

module.exports = {
    name: displayName,
    namespace,
    version,
    author,
    description,
    license,
    homepageURL: `https://github.com/${githubUser}/${githubRepo}`,
    updateURL: `https://github.com/${githubUser}/${githubRepo}/releases/latest/download/${name}.meta.js`,
    downloadURL: `https://github.com/${githubUser}/${githubRepo}/releases/latest/download/${name}.user.js`,
    supportURL: `https://github.com/${githubUser}/${githubRepo}/issues/new/choose`,
    match: `https://github.com/*`,
    "run-at": `document-start`,
    grant: `none`,

    toString() {
        const maxLength = (Object.keys(this).map(x => x.length).sort((a, b) => b - a)[0] || 0) + 6;

        return [
            "// ==UserScript==",
            ...Object
                .entries(this)
                .filter(([_, value]) => typeof value !== "function")
                .map(([key, value]) => `// @${key}`.padEnd(maxLength, " ") + value),
            "// ==/UserScript==",
        ].join(EOL);
    },
};

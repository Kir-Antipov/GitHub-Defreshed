const {
    name,
    displayName,
    version,
    author,
    description,
    githubUser,
    githubRepo,
} = require("../package.json");

module.exports = {
    manifest_version: 2,
    name: displayName,
    description,
    version,
    author,
    homepage_url: `https://github.com/${githubUser}/${githubRepo}`,
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
    },

    toString() {
        return JSON.stringify(this);
    },
};

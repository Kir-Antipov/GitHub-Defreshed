/* eslint-disable */
const { JSDOM } = require("jsdom");
const tsNode = require("ts-node");

tsNode.register({
    transpileOnly: true,
});

const dom = new JSDOM();
Object.assign(global, {
    chrome: {},
    browser: {},
    changeUrl: url => dom.reconfigure({ url }),

    window: dom.window,
    document: dom.window.document,
    location: dom.window.location,
});

const { sleep } = require("./sleep");

async function waitUntilElementReady(container, selector, interval, timeout) {
    let start = new Date();
    while (!container.querySelector(selector) && (new Date() - start) < timeout)
        await sleep(interval);
    
    return !!container.querySelector(selector);
}

export default async function waitUntilReady(options) {
    if (typeof options == "string")
        options = {
            selectors: [...arguments]
        };
    else if (options instanceof Node)
        options = {
            container: arguments[0],
            selectors: [...arguments].splice(1)
        };
    
    options.container = options.container || document;
    options.interval = options.interval || 100;
    options.timeout = options.timeout || 1500;
    if (!Array.isArray(options.selectors))
        options.selectors = [...options.selectors];

    let results = await Promise.all(options.selectors.map(selector => waitUntilElementReady(options.container, selector, options.interval, options.timeout)));
    return results.every(x => x);
}
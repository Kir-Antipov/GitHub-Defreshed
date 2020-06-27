const { sleep } = require("./sleep");

async function waitUntilElementReady(container, selector, interval, timeout) {
    let start = new Date();
    while (!container.querySelector(selector) && (new Date() - start) < timeout)
        await sleep(interval);
    
    return !!container.querySelector(selector);
}

export function waitUntilReady(options) {
    if (typeof options == "string")
        options = {
            container: document,
            selectors: [...arguments]
        };
    else if (options instanceof Node)
        options = {
            container: arguments[0],
            selectors: [...arguments].splice(1)
        };
    
    options.interval = options.interval || 100;
    options.timeout = options.timeout || 1500;
    if (!Array.isArray(options.selectors))
        options.selectors = [...options.selectors];

    return Promise.all(options.selectors.map(selector => waitUntilElementReady(options.container, selector, options.interval, options.timeout)));
}
import { sleep } from "./sleep";
import { findRule } from "./find-rule";

async function waitUntilTrue(predicate, interval, timeout) {
    let start = new Date();
    while (!predicate() && (new Date() - start) < timeout)
        await sleep(interval);
    
    return predicate(); 
}

function waitUntilElementReady(container, selector, interval, timeout) {
    return waitUntilTrue(() => !!container.querySelector(selector), interval, timeout);
}

function waitUntilStyleSheetReady(selector, interval, timeout) {
    return waitUntilTrue(() => !!findRule(selector), interval, timeout);
}

export function checkIfElementsReady(options) {
    if (typeof options == "string")
        options = {
            selectors: [...arguments]
        };
    else if (options instanceof Node)
        options = {
            container: arguments[0],
            selectors: [...arguments].splice(1)
        };

    options.interval = 0;
    options.timeout = 0;
    return waitUntilElementsReady(options);
}

export function waitUntilHeadReady(options) {
    options = {
        interval: 100,
        timeout: 3000,
        ...options
    };

    return waitUntilTrue(() => !!document.head, options.interval, options.timeout);
}

export function waitUntilDocumentReady(options) {
    options = {
        interval: 100,
        timeout: 3000,
        ...options
    };
    return waitUntilTrue(() => ["complete", "interactive", "uninitialized"].includes(document.readyState), options.interval, options.timeout);
}

export async function waitUntilStyleSheetsReady(options) {
    if (typeof options == "string")
        options = {
            selectors: [...arguments]
        };
    
    options = {
        interval: 100,
        timeout: 1000,
        selectors: [],
        ...options
    };
    if (options.selector)
        options.selectors = [options.selector];
    if (options.selectors && !Array.isArray(options.selectors))
        options.selectors = [...options.selectors];

    let results = await Promise.all(options.selectors.map(selector => waitUntilStyleSheetReady(selector, options.interval, options.timeout)));
    return results.every(x => x);
}

export async function waitUntilElementsReady(options) {
    if (typeof options == "string")
        options = {
            selectors: [...arguments]
        };
    else if (options instanceof Node)
        options = {
            container: arguments[0],
            selectors: [...arguments].splice(1)
        };
    
    options = {
        container: document,
        interval: 100,
        timeout: 1500,
        selectors: [],
        ...options
    };
    if (options.selector)
        options.selectors = [options.selector];
    if (options.selectors && !Array.isArray(options.selectors))
        options.selectors = [...options.selectors];

    let results = await Promise.all(options.selectors.map(selector => waitUntilElementReady(options.container, selector, options.interval, options.timeout)));
    return results.every(x => x);
}
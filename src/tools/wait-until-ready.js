import { sleep } from "./sleep";

async function waitUntilBoolean(predicate, interval, timeout) {
    let start = new Date();
    while ((new Date() - start) < timeout) {
        let result = predicate();
        if (typeof result == "boolean")
            return result;
        await sleep(interval);
    }
    
    return !!predicate();
}

function isDocumentReady() {
    return ["complete", "interactive", "uninitialized"].includes(document.readyState);
}

function isElementReady(el) {
    return el && (isDocumentReady() || hasNextSibling(el));
}

function hasNextSibling(el) {
    return el && (el.nextSibling || hasNextSibling(el.parentNode));
}

function waitUntilElementReady(container, selector, interval, timeout, enableDynamicLoading) {
    let predicate = enableDynamicLoading ?
        (() => isElementReady(container.querySelector(selector)) ? true : null) :
        (() => isDocumentReady() ? isElementReady(container.querySelector(selector)) : (isElementReady(container.querySelector(selector)) ? true : null));

    return waitUntilBoolean(predicate, interval, timeout);
}

function waitUntilEntryReady(container, selector, interval, timeout, enableDynamicLoading) {
    let predicate = enableDynamicLoading ?
        (() => container.querySelector(selector) ? true : null) :
        (() => isDocumentReady() ? !!container.querySelector(selector) : (container.querySelector(selector) ? true : null));

    return waitUntilBoolean(predicate, interval, timeout);
}

async function waitUntilElements(args, predicate) {
    let options = args[0];
    if (typeof options == "string")
        options = {
            selectors: [...args]
        };
    else if (options instanceof Node)
        options = {
            container: args[0],
            selectors: [...args].splice(1)
        };
    
    options = {
        container: document,
        interval: 100,
        timeout: 1500,
        dynamic: false,
        selectors: [],
        ...options
    };
    if (options.selector)
        options.selectors = [options.selector];
    if (options.selectors && !Array.isArray(options.selectors))
        options.selectors = [...options.selectors];

    let results = await Promise.all(options.selectors.map(selector => predicate(options.container, selector, options.interval, options.timeout, options.dynamic)));
    return results.every(x => x);
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

    return waitUntilBoolean(() => document.head ? true : null, options.interval, options.timeout);
}

export function waitUntilDocumentReady(options) {
    options = {
        interval: 100,
        timeout: 3000,
        ...options
    };
    return waitUntilBoolean(() => isDocumentReady() ? true : null, options.interval, options.timeout);
}

export function waitUntilEntriesReady(...args) {
    return waitUntilElements(args, waitUntilEntryReady);
}

export function waitUntilElementsReady(...args) {
    return waitUntilElements(args, waitUntilElementReady);
}
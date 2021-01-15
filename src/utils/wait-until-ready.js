import { sleep } from "./sleep";

/**
 * @typedef {object} WaitOptions
 * Represents options for waitUntil- functions.
 * 
 * @property {HTMLElement} container
 * The container.
 * 
 * @property {number} interval
 * The interval, in milliseconds.
 * 
 * @property {number} timeout
 * The timeout, in milliseconds.
 * 
 * @property {boolean} dynamic
 * Indicates whether to continue waiting for the elements if
 * the document has already been fully loaded.
 *  
 * @property {string[]} selectors
 * Expected elements' selectors.
 * 
 * @property {string} selector
 * Expected element selector.
*/

/**
 * Waits for the predicate to return a boolean value.
 * 
 * @param {() => boolean | null} predicate The predicate that returns boolean or null.
 * @param {number} interval The interval, in milliseconds.
 * @param {number} timeout The timeout, in milliseconds.
 * 
 * @returns {Promise<boolean>} Last predicate value.
 */
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

/**
 * Checks if the document is ready.
 * 
 * @returns {boolean} true if the document is ready; otherwise, false.
 */
function isDocumentReady() {
    return ["complete", "interactive", "uninitialized"].includes(document.readyState);
}

/**
 * Checks if the element is ready.
 * 
 * @param {Node} element The element.
 * 
 * @returns {boolean} true if the element is ready; otherwise, false.
 */
function isElementReady(element) {
    return element && (isDocumentReady() || hasNextSibling(element));
}

/**
 * Checks if the element has next sibling.
 * 
 * @param {Node} element The element.
 * 
 * @returns {boolean} true if the element has next sibling; otherwise, false.
 */
function hasNextSibling(element) {
    return element && (element.nextSibling || hasNextSibling(element.parentNode));
}

/**
 * Waits for the element to load.
 * 
 * @param {HTMLElement} container The container.
 * @param {string} selector Expected element selector.
 * @param {number} interval The interval, in milliseconds.
 * @param {number} timeout The timeout, in milliseconds.
 * @param {boolean} enableDynamicLoading
 * Indicates whether to continue waiting for the element if
 * the document has already been fully loaded.
 * 
 * @returns {Promise<boolean>} true if the element is ready; otherwise, false.
 */
function waitUntilElementReady(container, selector, interval, timeout, enableDynamicLoading) {
    let predicate = enableDynamicLoading ?
        (() => isElementReady(container.querySelector(selector)) ? true : null) :
        (() => isDocumentReady() ? isElementReady(container.querySelector(selector)) : (isElementReady(container.querySelector(selector)) ? true : null));

    return waitUntilBoolean(predicate, interval, timeout);
}

/**
 * Waits for the element to appear.
 * 
 * @param {HTMLElement} container The container.
 * @param {string} selector Expected element selector.
 * @param {number} interval The interval, in milliseconds.
 * @param {number} timeout The timeout, in milliseconds.
 * @param {boolean} enableDynamicLoading
 * Indicates whether to continue waiting for the element if
 * the document has already been fully loaded.
 * 
 * @returns {Promise<boolean>} true if the element exists; otherwise, false.
 */
function waitUntilEntryReady(container, selector, interval, timeout, enableDynamicLoading) {
    let predicate = enableDynamicLoading ?
        (() => container.querySelector(selector) ? true : null) :
        (() => isDocumentReady() ? !!container.querySelector(selector) : (container.querySelector(selector) ? true : null));

    return waitUntilBoolean(predicate, interval, timeout);
}

/**
 * Waits for the execution of a predicate for all elements.
 * 
 * @param {WaitOptions} args
 * Predicate's arguments.
 * @param {(container: HTMLElement, selector: string, interval: number, timeout: number, enableDynamicLoading: boolean) => Promise<boolean>} predicate 
 * The predicate.
 * 
 * @returns {Promise<boolean>}
 * true if the predicate returned true for all elements; otherwise, false.
 */
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

/**
 * Checks if elements are ready.
 * 
 * @param {WaitOptions} options The options.
 * 
 * @returns {Promise<boolean>} true if the elements are ready; otherwise, false.
 */
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

/**
 * Checks if \<head\> is ready.
 * 
 * @param {WaitOptions} options The options.
 * 
 * @returns {Promise<boolean>} true if \<head\> is ready; otherwise, false.
 */
export function waitUntilHeadReady(options) {
    options = {
        interval: 100,
        timeout: 3000,
        ...options
    };

    return waitUntilBoolean(() => document.head ? true : null, options.interval, options.timeout);
}

/**
 * Waits for the document to load.
 * 
 * @param {WaitOptions} options The options.
 * 
 * @returns {Promise<boolean>} true if the document is ready; otherwise, false.
 */
export function waitUntilDocumentReady(options) {
    options = {
        interval: 100,
        timeout: 3000,
        ...options
    };
    return waitUntilBoolean(() => isDocumentReady() ? true : null, options.interval, options.timeout);
}

/**
 * Waits for the elements to appear.
 * 
 * @param {WaitOptions} args The options.
 * 
 * @returns {Promise<boolean>} true if elements exist; otherwise, false.
 */
export function waitUntilEntriesReady(...args) {
    return waitUntilElements(args, waitUntilEntryReady);
}

/**
 * Waits for the elements to load.
 * 
 * @param {WaitOptions} args The options.
 * 
 * @returns {Promise<boolean>} true if elements are ready; otherwise, false.
 */
export function waitUntilElementsReady(...args) {
    return waitUntilElements(args, waitUntilElementReady);
}
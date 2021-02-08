import { sleep } from "@utils/sleep";

/**
 * Represents options for waitUntil- functions.
 */
interface WaitOptions {
    /**
     * The container.
     */
    container?: HTMLElement;

    /**
     * The interval, in milliseconds.
     */
    interval?: number;

    /**
     * The timeout, in milliseconds.
     */
    timeout?: number;

    /**
     * Indicates whether to continue waiting for the elements if
     * the document has already been fully loaded.
     */
    dynamic?: boolean;

    /**
     * Expected elements' selectors.
     */
    selectors?: string[];

    /**
     * Expected element selector.
     */
    selector?: string;
}

type WaitArgs = [WaitOptions] | [HTMLElement, ...string[]] | string[];

type ElementPredicate = (
    container: HTMLElement,
    selector: string,
    interval: number,
    timeout: number,
    enableDynamicLoading: boolean
) => Promise<boolean>;

/**
 * Waits for the predicate to return a boolean value.
 *
 * @param predicate The predicate that returns boolean or null.
 * @param interval The interval, in milliseconds.
 * @param timeout The timeout, in milliseconds.
 *
 * @returns Last predicate value.
 */
async function waitUntilBoolean(predicate: () => boolean | null, interval: number, timeout: number) {
    let start = new Date();
    while ((new Date().valueOf() - start.valueOf()) < timeout) {
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
 * @returns true if the document is ready; otherwise, false.
 */
function isDocumentReady() {
    return ["complete", "interactive", "uninitialized"].includes(document.readyState);
}

/**
 * Checks if the element is ready.
 *
 * @param element The element.
 *
 * @returns true if the element is ready; otherwise, false.
 */
function isElementReady(element: Node) {
    return element && (isDocumentReady() || hasNextSibling(element));
}

/**
 * Checks if the element has next sibling.
 *
 * @param element The element.
 *
 * @returns true if the element has next sibling; otherwise, false.
 */
function hasNextSibling(element: Node): boolean {
    return element && (!!element.nextSibling || hasNextSibling(element.parentNode));
}

/**
 * Waits for the element to load.
 *
 * @param container The container.
 * @param selector Expected element selector.
 * @param interval The interval, in milliseconds.
 * @param timeout The timeout, in milliseconds.
 * @param enableDynamicLoading
 * Indicates whether to continue waiting for the element if
 * the document has already been fully loaded.
 *
 * @returns true if the element is ready; otherwise, false.
 */
function waitUntilElementReady(container: HTMLElement, selector: string, interval: number, timeout: number, enableDynamicLoading: boolean) {
    let predicate = enableDynamicLoading ?
        (() => isElementReady(container.querySelector(selector)) ? true : null) :
        (() => isDocumentReady() ? isElementReady(container.querySelector(selector)) : (isElementReady(container.querySelector(selector)) ? true : null));

    return waitUntilBoolean(predicate, interval, timeout);
}

/**
 * Waits for the element to appear.
 *
 * @param container The container.
 * @param selector Expected element selector.
 * @param interval The interval, in milliseconds.
 * @param timeout The timeout, in milliseconds.
 * @param enableDynamicLoading
 * Indicates whether to continue waiting for the element if
 * the document has already been fully loaded.
 *
 * @returns true if the element exists; otherwise, false.
 */
function waitUntilEntryReady(container: HTMLElement, selector: string, interval: number, timeout: number, enableDynamicLoading: boolean) {
    let predicate = enableDynamicLoading ?
        (() => container.querySelector(selector) ? true : null) :
        (() => isDocumentReady() ? !!container.querySelector(selector) : (container.querySelector(selector) ? true : null));

    return waitUntilBoolean(predicate, interval, timeout);
}

/**
 * Waits for the execution of a predicate for all elements.
 *
 * @returns
 * true if the predicate returned true for all elements; otherwise, false.
 */
async function waitUntilElements(args: WaitArgs, predicate: ElementPredicate) {
    let options: WaitOptions;
    if (typeof args[0] == "string") {
        options = {
            selectors: [...args as string[]]
        };
    }
    else if (args[0] instanceof HTMLElement) {
        options = {
            container: args[0],
            selectors: [...args as string[]].splice(1)
        };
    } else {
        options = args[0];
    }

    options = {
        container: document.documentElement,
        interval: 100,
        timeout: 1500,
        dynamic: false,
        selectors: [],
        ...options
    };
    if (options.selector) {
        options.selectors = [options.selector];
    }
    if (options.selectors && !Array.isArray(options.selectors)) {
        options.selectors = [...options.selectors];
    }

    let results = await Promise.all(options.selectors.map(selector => predicate(options.container, selector, options.interval, options.timeout, options.dynamic)));
    return results.every(x => x);
}

export function checkIfElementsReady(...selectors: string[]): Promise<boolean>;
export function checkIfElementsReady(container: HTMLElement, ...selectors: string[]): Promise<boolean>;
export function checkIfElementsReady(options: WaitOptions): Promise<boolean>;

/**
 * Checks if elements are ready.
 *
 * @returns true if the elements are ready; otherwise, false.
 */
export function checkIfElementsReady(...args: WaitArgs) {
    let options: WaitOptions;
    if (typeof args[0] == "string") {
        options = {
            selectors: args as string[]
        };
    }
    else if (args[0] instanceof Node) {
        options = {
            container: arguments[0],
            selectors: [...arguments].splice(1)
        };
    } else {
        options = args[0];
    }

    options.interval = 0;
    options.timeout = 0;
    return waitUntilElementsReady(options);
}

/**
 * Checks if \<head\> is ready.
 *
 * @returns true if \<head\> is ready; otherwise, false.
 */
export function waitUntilHeadReady(options?: WaitOptions) {
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
 * @param options The options.
 *
 * @returns true if the document is ready; otherwise, false.
 */
export function waitUntilDocumentReady(options?: WaitOptions) {
    options = {
        interval: 100,
        timeout: 3000,
        ...options
    };
    return waitUntilBoolean(() => isDocumentReady() ? true : null, options.interval, options.timeout);
}

export function waitUntilEntriesReady(...selectors: string[]): Promise<boolean>;
export function waitUntilEntriesReady(container: HTMLElement, ...selectors: string[]): Promise<boolean>;
export function waitUntilEntriesReady(options: WaitOptions): Promise<boolean>;

/**
 * Waits for the elements to appear.
 *
 * @returns true if elements exist; otherwise, false.
 */
export function waitUntilEntriesReady(...args: WaitArgs) {
    return waitUntilElements(args, waitUntilEntryReady);
}

export function waitUntilElementsReady(...selectors: string[]): Promise<boolean>;
export function waitUntilElementsReady(container: HTMLElement, ...selectors: string[]): Promise<boolean>;
export function waitUntilElementsReady(options: WaitOptions): Promise<boolean>;

/**
 * Waits for the elements to load.
 *
 * @returns true if elements are ready; otherwise, false.
 */
export function waitUntilElementsReady(...args: WaitArgs) {
    return waitUntilElements(args, waitUntilElementReady);
}
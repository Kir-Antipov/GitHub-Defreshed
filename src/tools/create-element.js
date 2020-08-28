/**
 * Indicates whether the object is iterable.
 * 
 * @param {*} obj Object to test.
 * 
 * @returns {boolean} true if the object is iterable; otherwise, false.
 */
function isIterable(obj) {
    if (!obj)
        return false;

    return typeof obj[Symbol.iterator] == "function";
}

/**
 * Recursively copies property values ​​from options to object.
 * 
 * @param {*} obj Copy target.
 * @param {*} options Copy source.
 */
function setup(obj, options) {
    if (obj instanceof HTMLElement) {
        if (isIterable(options.children)) {
            obj.append(...options.children);
            delete options.children;
        }

        if (options.attributes && typeof options.attributes == "object") {
            for (let attributeName in options.attributes)
                obj.setAttribute(attributeName, options.attributes[attributeName]);
            delete options.attributes;
        }
    }
    
    for (let propertyName in options) {
        let target = obj[propertyName];
        let value = options[propertyName];
        if (value && typeof value == "object") {
            if (target === null || target === undefined) 
                target = obj[propertyName] = {};
            setup(target, value);
        } else {
            obj[propertyName] = options[propertyName];
        }
    }
}

/**
 * Creates &lt;style&gt; element from the CSS text value.
 * 
 * @param {string} css CSS text.
 * 
 * @returns {HTMLStyleElement} &lt;style&gt; element.
 */
export function createStyleElement(css) {
    return createElement("style", {
        type: "text/css",
        children: [
            css
        ]
    });
}

/**
 * @typedef {object} HTMLElementOptions
 * @property {(string | Node)[]} options.children Element's child nodes.
 * @property {object} options.attributes Element's attributes.
*/
 
/**
 * Creates a DOM element with the given tag name,
 * recursively assigning values from the options
 * to its properties.
 * 
 * @template TagName
 * @param {TagName & HTMLElementTagNameMap} tagName Tag name.
 * @param {HTMLElementOptions & HTMLElementTagNameMap[TagName]} options Element's property values.
 * 
 * @returns {HTMLElementTagNameMap[TagName]} DOM element.
 */
export function createElement(tagName = "div", options) {
    if (typeof options == "string") 
        options = { className: options };
    options = options || {};
    
    let element = document.createElement(tagName);
    setup(element, options);

    return element;
}

export default createElement;
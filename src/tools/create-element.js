function isIterable(obj) {
    if (!obj)
        return false;

    return typeof obj[Symbol.iterator] == "function";
}

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

export function createStyleElement(css) {
    return createElement("style", {
        type: "text/css",
        children: [
            css
        ]
    });
}

export default function createElement(tagName = "div", options) {
    if (typeof options == "string") 
        options = { className: options };
    options = options || {};
    
    let element = document.createElement(tagName);
    setup(element, options);

    return element;
}
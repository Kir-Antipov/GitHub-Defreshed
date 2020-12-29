/**
 * Creates element from raw html.
 *
 * @param {string} html Raw HTML text.
 *
 * @returns {HTMLElement} The element.
 */
export function parseElement(html) {
    let container = document.createElement("div");
    container.innerHTML = html;
    return container.firstChild;
}

export default parseElement;
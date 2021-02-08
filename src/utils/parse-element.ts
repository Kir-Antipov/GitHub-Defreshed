/**
 * Creates element from raw html.
 */
export function parseElement<T extends Node = Node>(html: string) {
    let container = document.createElement("div");
    container.innerHTML = html;
    return container.firstChild as unknown as T;
}

export default parseElement;
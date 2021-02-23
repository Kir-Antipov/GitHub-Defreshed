/**
 * Determines if current page is a 404 template.
 *
 * @returns true if current page is a 404 template; otherwise, false.
 */
export function is404() {
    const title = document.head.querySelector("title")?.innerText;
    return title === "Page not found · GitHub";
}

/**
 * Determines if current page is a repository setup page.
 *
 * @returns true if current page is a repository setup page; otherwise, false.
 */
export function isRepoSetup() {
    return !!document.querySelector("main:nth-child(1) div.repository-content > git-clone-help");
}

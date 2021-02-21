import { check as isReserved } from "github-reserved-names";

/**
 * Gets a list of repository branches.
 *
 * This method only works on repository pages.
 */
function getRepoBranches() {
    return [...document.querySelectorAll<HTMLSpanElement>("#ref-list-branches > .SelectMenu-list > a > span:not(.Label)")]
        .map(x => x.innerText && x.innerText.trim())
        .filter(x => x);
}

/**
 * This method returns a pathname without leading and trailing slashes.
 */
export function cleanPathname(path = location.pathname) {
    try {
        path = new URL(path).pathname;
    } catch (_) { }

    return path.replace(/^[/]|[/]$|(\?(.*))$|(\/\?(.*))$/g, "");
}

/**
 * Extracts repository name and its owner from the page's url.
 */
export function getOwnerAndRepo(path = location.pathname) {
    path = cleanPathname(path);
    if (!isRepo(path))
        return null;

	let [owner, repo] = path.split("/");
	return { owner, repo };
}

/**
 * Extracts the relative path to the root of the repository.
 */
export function getRepoURL(path = location.pathname) {
    let data = getOwnerAndRepo(path);
    if (!data)
        return null;

    return `${data.owner}/${data.repo}`;
}

/**
 * Extracts repository's path.
 */
export function getRepoPath(path = location.pathname) {
    path = cleanPathname(path);
	if (!isRepo(path))
        return null;

    let match = path.match(/^[^/]+[/][^/]+[/]?(.*)$/);
    if (!match)
        return null;

	return match[1];
}

/**
 * Determines if the link points to the root of the site.
 *
 * @returns true if url satisfies the condition; otherwise, false.
 */
export function isRoot(path = location.pathname) {
    return !cleanPathname(path);
}

/**
 * Determines if the link points to the dashboard.
 *
 * @returns true if url satisfies the condition; otherwise, false.
 */
export function isDashboard(path = location.pathname) {
    return /^((orgs[/][^/]+[/])?dashboard([/]index[/]\d+)?)?$/.test(cleanPathname(path));
}

/**
 * Determines if the link points to the notifications.
 *
 * @returns true if url satisfies the condition; otherwise, false.
 */
export function isNotifications(path = location.pathname) {
    return /^([^/]+[/][^/]+\/)?notifications/.test(cleanPathname(path));
}

/**
 * Determines if the link points to the repository.
 *
 * @returns true if url satisfies the condition; otherwise, false.
 */
export function isRepo(path = location.pathname) {
    path = cleanPathname(path);
    let owner = path.substring(0, path.indexOf("/"));

    return !is404() &&
        /^[^/]+\/[^/]+/.test(path) &&
        !isReserved(owner) &&
        !isDashboard(path) &&
        !isNotifications(path);
}

/**
 * Determines if the link points to the repository's root.
 *
 * @returns true if url satisfies the condition; otherwise, false.
 */
export function isRepoRoot(path = location.pathname) {
    let repoPath = getRepoPath(path);
    let commonTestResult = /^(tree[/][^/]+)?$/.test(repoPath);
    if (commonTestResult || !(repoPath || "").startsWith("tree/"))
        return commonTestResult;

    repoPath = repoPath.substring(5); // "tree/".length
    return !is404() && getRepoBranches().some(x => x == repoPath);
}

/**
 * Determines if the link points to the repository's tree.
 *
 * @returns true if url satisfies the condition; otherwise, false.
 */
export function isRepoTree(path = location.pathname) {
    return !is404() && /^tree\//.test(getRepoPath(path));
}

/**
 * Determines if current page is a repository setup page.
 *
 * @returns true if current page is a repository setup page; otherwise, false.
 */
export function isRepoSetup() {
    return !!document.querySelector("main:nth-child(1) div.repository-content > git-clone-help");
}

/**
 * Determines if the link points to the single repository's file.
 *
 * @returns true if url satisfies the condition; otherwise, false.
 */
export function isSingleFile(path = location.pathname) {
    return /^blob\//.test(getRepoPath(path));
}

/**
 * Determines if the link points to the raw file.
 *
 * @returns true if url satisfies the condition; otherwise, false.
 */
export function isRaw(path = location.pathname) {
    return (getRepoPath(path) || "").startsWith("raw/");
}

/**
 * Determines if the link points to the archive.
 *
 * @returns true if url satisfies the condition; otherwise, false.
 */
export function isArchive(path = location.pathname) {
    return (getRepoPath(path) || "").startsWith("archive/");
}

/**
 * Determines if the link points to the release's file.
 *
 * @returns true if url satisfies the condition; otherwise, false.
 */
export function isReleaseFile(path = location.pathname) {
    return (getRepoPath(path) || "").startsWith("releases/download/");
}

/**
 * Determines if the link points to the downloadable file.
 *
 * @returns true if url satisfies the condition; otherwise, false.
 */
export function isFile(path = location.pathname) {
    return isRaw(path) || isArchive(path) || isReleaseFile(path);
}

/**
 * Determines if the link points to the project board.
 *
 * @returns true if url satisfies the condition; otherwise, false.
 */
export function isProject(path = location.pathname) {
    return /^projects\/\d+$/.test(getRepoPath(path));
}

/**
 * Determines if the link is an anchor.
 *
 * @returns true if url satisfies the condition; otherwise, false.
 */
export function isAnchor(path = location.pathname) {
    return /#[^/]*$/.test(path);
}

/**
 * Determines if the link points to the profile settings.
 *
 * @returns true if url satisfies the condition; otherwise, false.
 */
export function isProfileSettings(path = location.pathname) {
    return !is404() && cleanPathname(path).startsWith("settings/profile");
}

/**
 * Determines if the link points to the profile.
 *
 * @returns true if url satisfies the condition; otherwise, false.
 */
export function isProfile(path = location.pathname) {
    path = cleanPathname(path);
    return !is404() && path && !path.includes("/") && !isReserved(path);
}

/**
 * Determines if current page is a 404 template.
 *
 * @returns true if current page is a 404 template; otherwise, false.
 */
export function is404() {
    let title = (document.head.querySelector("title") || {}).innerText || "";
    return title === "Page not found · GitHub";
}
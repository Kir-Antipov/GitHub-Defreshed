import { check as isReserved } from "github-reserved-names";

/**
 * Gets a list of repository branches.
 * 
 * This method only works on repository pages.
 * 
 * @returns {string[]} List of repository branches.
 */
function getRepoBranches() {
    return [...document.querySelectorAll("#ref-list-branches > .SelectMenu-list > a > span:not(.Label)")]
        .map(x => x.innerText && x.innerText.trim())
        .filter(x => x);
}

/**
 * This method returns a pathname without leading and trailing slashes.
 * 
 * @param {string} path Page's URL. Can be either absolute or relative.
 * 
 * @returns {string} URL's pathname without leading and trailing slashes.
 */
export function cleanPathname(path = location.pathname) {
    try {
        path = new URL(path).pathname;
    } catch (_) { }

    return path.replace(/^[/]|[/]$|(\?(.*))$|(\/\?(.*))$/g, "");
}

/**
 * Extracts repository name and its owner from the page's url.
 * 
 * @param {string} path Page's URL. Can be either absolute or relative.
 * 
 * @returns {{ owner: string, repo: string }} Repository name and its owner.
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
 * 
 * @param {string} path Page's URL. Can be either absolute or relative.
 * 
 * @returns {string} The relative path to the root of the repository.
 */
export function getRepoURL(path = location.pathname) {
    let data = getOwnerAndRepo(path);
    if (!data)
        return null;

    return `${data.owner}/${data.repo}`;
}

/**
 * Extracts repository's path.
 * 
 * @param {string} path Page's URL. Can be either absolute or relative.
 * 
 * @returns {string} Repository's path.
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
 * @param {string} path Page's URL. Can be either absolute or relative.
 * 
 * @returns {boolean} true if url satisfies the condition; otherwise, false.
 */
export function isRoot(path = location.pathname) {
    return !cleanPathname(path);
}

/**
 * Determines if the link points to the dashboard.
 * 
 * @param {string} path Page's URL. Can be either absolute or relative.
 * 
 * @returns {boolean} true if url satisfies the condition; otherwise, false.
 */
export function isDashboard(path = location.pathname) {
    return /^((orgs[/][^/]+[/])?dashboard([/]index[/]\d+)?)?$/.test(cleanPathname(path));
}

/**
 * Determines if the link points to the notifications.
 * 
 * @param {string} path Page's URL. Can be either absolute or relative.
 * 
 * @returns {boolean} true if url satisfies the condition; otherwise, false.
 */
export function isNotifications(path = location.pathname) {
    return /^([^/]+[/][^/]+\/)?notifications/.test(cleanPathname(path));
}

/**
 * Determines if the link points to the repository.
 * 
 * @param {string} path Page's URL. Can be either absolute or relative.
 * 
 * @returns {boolean} true if url satisfies the condition; otherwise, false.
 */
export function isRepo(path = location.pathname) {
    path = cleanPathname(path);
    let owner = path.substring(0, path.indexOf("/"));

    return /^[^/]+\/[^/]+/.test(path) &&
        !isReserved(owner) &&
        !isDashboard(path) &&
        !isNotifications(path);
}

/**
 * Determines if the link points to the repository's root.
 * 
 * @param {string} path Page's URL. Can be either absolute or relative.
 * 
 * @returns {boolean} true if url satisfies the condition; otherwise, false.
 */
export function isRepoRoot(path = location.pathname) {
    path = getRepoPath(path);
    let commonTestResult = /^(tree[/][^/]+)?$/.test(path);
    if (commonTestResult || !(path || "").startsWith("tree/"))
        return commonTestResult;
    
    path = path.substring(5); // "tree/".length
    return getRepoBranches().some(x => x == path);
}

/**
 * Determines if the link points to the repository's tree.
 * 
 * @param {string} path Page's URL. Can be either absolute or relative.
 * 
 * @returns {boolean} true if url satisfies the condition; otherwise, false.
 */
export function isRepoTree(path = location.pathname) {
    return /^tree\//.test(getRepoPath(path));
}

/**
 * Determines if the link points to the single repository's file.
 * 
 * @param {string} path Page's URL. Can be either absolute or relative.
 * 
 * @returns {boolean} true if url satisfies the condition; otherwise, false.
 */
export function isSingleFile(path = location.pathname) {
    return /^blob\//.test(getRepoPath(path));
}

/**
 * Determines if the link points to the raw file.
 * 
 * @param {string} path Page's URL. Can be either absolute or relative.
 * 
 * @returns {boolean} true if url satisfies the condition; otherwise, false.
 */
export function isRaw(path = location.pathname) {
    return (getRepoPath(path) || "").startsWith("raw/");
}

/**
 * Determines if the link points to the archive.
 * 
 * @param {string} path Page's URL. Can be either absolute or relative.
 * 
 * @returns {boolean} true if url satisfies the condition; otherwise, false.
 */
export function isArchive(path = location.pathname) {
    return (getRepoPath(path) || "").startsWith("archive/");
}

/**
 * Determines if the link points to the release's file.
 * 
 * @param {string} path Page's URL. Can be either absolute or relative.
 * 
 * @returns {boolean} true if url satisfies the condition; otherwise, false.
 */
export function isReleaseFile(path = location.pathname) {
    return (getRepoPath(path) || "").startsWith("releases/download/");
}

/**
 * Determines if the link points to the downloadable file.
 * 
 * @param {string} path Page's URL. Can be either absolute or relative.
 * 
 * @returns {boolean} true if url satisfies the condition; otherwise, false.
 */
export function isFile(path = location.pathname) {
    return isRaw(path) || isArchive(path) || isReleaseFile(path);
}

/**
 * Determines if the link points to the project board.
 * 
 * @param {string} path Page's URL. Can be either absolute or relative.
 * 
 * @returns {boolean} true if url satisfies the condition; otherwise, false.
 */
export function isProject(path = location.pathname) {
    return /^projects\/\d+$/.test(getRepoPath(path));
}

/**
 * Determines if the link is an anchor.
 * 
 * @param {string} path Page's URL. Can be either absolute or relative.
 * 
 * @returns {boolean} true if url satisfies the condition; otherwise, false.
 */
export function isAnchor(path = location.pathname) {
    return /#[^/]*$/.test(path);
}

/**
 * Determines if the link points to the profile settings.
 * 
 * @param {string} path Page's URL. Can be either absolute or relative.
 * 
 * @returns {boolean} true if url satisfies the condition; otherwise, false.
 */
export function isProfileSettings(path = location.pathname) {
    return cleanPathname(path).startsWith("settings/profile");
}

/**
 * Determines if the link points to the profile.
 * 
 * @param {string} path Page's URL. Can be either absolute or relative.
 * 
 * @returns {boolean} true if url satisfies the condition; otherwise, false.
 */
export function isProfile(path = location.pathname) {
    path = cleanPathname(path);
    return path && !path.includes("/") && !isReserved(path);
}
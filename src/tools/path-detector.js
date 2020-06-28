import { check as isReserved } from "github-reserved-names";

// This method returns a pathname without leading and trailing slashes.
// It can accept both a pathname (e.g. location.pathname) and a full url (e.g., location.href).
export function cleanPathname(path = location.pathname) {
    try {
        path = new URL(path).pathname;
    } catch (_) { }

    return path.replace(/^[/]|[/]$/g, "");
}

export function getOwnerAndRepo(path = location.pathname) {
    path = cleanPathname(path);
    if (!isRepo(path))
        return null;

	let [owner, repo] = path.split("/");
	return { owner, repo };
}

export function getRepoURL(path = location.pathname) {
    path = cleanPathname(path);
    if (!isRepo(path))
        return null;

    return path.split("/", 2).join("/");
}

export function getRepoPath(path = location.pathname) {
    path = cleanPathname(path);
	if (!isRepo(path))
        return null;
        
    let match = path.match(/^[^/]+[/][^/]+[/]?(.*)$/);
    if (!match)
        return null;

	return match[1];
}

export function isRoot(path = location.pathname) {
    return !cleanPathname(path);
}

export function isDashboard(path = location.pathname) {
    return /^((orgs[/][^/]+[/])?dashboard([/]index[/]\d+)?)?$/.test(cleanPathname(path));
}

export function isNotifications(path = location.pathname) {
    return /^([^/]+[/][^/]+\/)?notifications/.test(cleanPathname(path));
}

export function isRepo(path = location.pathname) {
    path = cleanPathname(path);
    let owner = path.substring(0, path.indexOf("/"));

    return /^[^/]+\/[^/]+/.test(path) &&
        !isReserved(owner) &&
        !isDashboard(path) &&
        !isNotifications(path);
}

export function isRepoRoot(path = location.pathname) {
    return /^(tree[/][^/]+)?$/.test(getRepoPath(path));
}

export function isRepoTree(path = location.pathname) {
    return /^tree\//.test(getRepoPath(path));
}
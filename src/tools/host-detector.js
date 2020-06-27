import { cleanPathname } from "./path-detector";

export function isGivenHost(location, host) {
    try {
        return new URL(location).host == host;
    } catch (_) {
        return false;
    }
}

export function isAbsoluteURL(url) {
    try {
        path = new URL(path);
        return true;
    } catch (_) {
        return false;
    } 
}

export function getAbsoluteURL(path = location.pathname, host = location.host, protocol = location.protocol) {
    if (isAbsoluteURL(path))
        return path;

    path = cleanPathname(path);
    return `${protocol}//${host}/${path}`;
}

export function isSameSiteURL(link) {
    if (!link)
        return false;

    return link.startsWith("/") || isGivenHost(link, location.host);
}

export function isGitHub(location = window.location.href) {
    return isGivenHost(location, "github.com");
}

export function isGitHubGist(location = window.location.href) {
    return isGivenHost(location, "gist.github.com");
}
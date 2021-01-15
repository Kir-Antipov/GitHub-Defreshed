import { cleanPathname } from "./path-detector";

/**
 * Indicates whether location's host is equal to the given host.
 * 
 * @param {string} location
 * @param {string} host
 * 
 * @returns {boolean} true if location's host is equal to the given host; otherwise, false.
 */
export function isGivenHost(location, host) {
    try {
        return new URL(location).host == host;
    } catch (_) {
        return window.location.host == host && location.startsWith("/");
    }
}

/**
 * Indicates whether the url is absolute.
 * 
 * @param {string} url
 * 
 * @returns {boolean} true if the url is absolute; otherwise, false.
 */
export function isAbsoluteURL(url) {
    try {
        new URL(url);
        return true;
    } catch (_) {
        return false;
    } 
}

/**
 * Builds absolute URL.
 * 
 * @param {string} path URL's path.
 * @param {string} host URL's host.
 * @param {string} protocol URL's protocol.
 * 
 * @returns {string} Absolute URL.
 */
export function getAbsoluteURL(path = location.pathname, host = location.host, protocol = location.protocol) {
    if (isAbsoluteURL(path))
        return path;

    path = cleanPathname(path);
    return `${protocol}//${host}/${path}`;
}

/**
 * Indicates whether the url belongs to the current site.
 * 
 * @param {string} url URL. Can be either absolute or relative.
 * 
 * @returns {boolean} true if the url belongs to the current site; otherwise, false.
 */
export function isSameSiteURL(url) {
    if (!url)
        return false;

    return url.startsWith("/") || isGivenHost(url, location.host);
}

/**
 * Indicates whether the location belongs to github.com.
 * 
 * @param {string} location Page's URL. Can be either absolute or relative.
 * 
 * @returns {boolean} true if the location belongs to github.com; otherwise, false.
 */
export function isGitHub(location = window.location.href) {
    return isGivenHost(location, "github.com");
}

/**
 * Indicates whether the location belongs to gist.github.com.
 * 
 * @param {string} location Page's URL. Can be either absolute or relative.
 * 
 * @returns {boolean} true if the location belongs to gist.github.com; otherwise, false.
 */
export function isGitHubGist(location = window.location.href) {
    return isGivenHost(location, "gist.github.com");
}
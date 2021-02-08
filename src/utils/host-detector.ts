import { cleanPathname } from "@utils/path-detector";

/**
 * Indicates whether location's host is equal to the given host.
 *
 * @returns true if location's host is equal to the given host; otherwise, false.
 */
export function isGivenHost(location: string, host: string) {
    try {
        return new URL(location).host == host;
    } catch (_) {
        return window.location.host == host && location.startsWith("/");
    }
}

/**
 * Indicates whether the url is absolute.
 *
 * @returns true if the url is absolute; otherwise, false.
 */
export function isAbsoluteURL(url: string) {
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
 * @returns Absolute URL.
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
 * @returns true if the url belongs to the current site; otherwise, false.
 */
export function isSameSiteURL(url: string) {
    if (!url)
        return false;

    return url.startsWith("/") || isGivenHost(url, location.host);
}

/**
 * Indicates whether the location belongs to github.com.
 *
 * @returns true if the location belongs to github.com; otherwise, false.
 */
export function isGitHub(location = window.location.href) {
    return isGivenHost(location, "github.com");
}

/**
 * Indicates whether the location belongs to gist.github.com.
 *
 * @returns true if the location belongs to gist.github.com; otherwise, false.
 */
export function isGitHubGist(location = window.location.href) {
    return isGivenHost(location, "gist.github.com");
}
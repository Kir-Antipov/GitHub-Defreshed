import allFixers from "../fixers/all-fixers";
import { name } from "../../package.json";

/**
 * Indicates whether the script has already
 * been successfully injected into the page.
 * 
 * @returns {boolean} true if the script has been injected; otherwise, false.
 */
export function isDefreshed() {
    return document.documentElement.classList.contains(name);
}

/**
 * Sets a flag to the document indicating that the script 
 * was successfully injected into the page.
 */
export function markAsDefreshed() {
    document.documentElement.classList.add(name);
}

/**
 * Defreshes the page.
 * 
 * @param {string} location Page's URL. Can be either absolute or relative.
 */
export async function defresh(location = window.location.href) {
    let backupContainer = document.createElement("backup");
    for (let fixer of allFixers) {
        if (fixer.isApplieble(location, backupContainer) && await fixer.waitUntilFixerReady(location, backupContainer))
            try {
                fixer.apply(location, backupContainer);
            } catch (e) { 
                console.log("Fixer exception: ", e);
            }
    }
}

export default defresh;
import allFixers from "@fixers/all-fixers";
import config from "@config";

/**
 * Indicates whether the script has already
 * been successfully injected into the page.
 *
 * @returns true if the script has been injected; otherwise, false.
 */
export function isDefreshed() {
    return document.documentElement.classList.contains(config.name);
}

/**
 * Sets a flag to the document indicating that the script
 * was successfully injected into the page.
 */
export function markAsDefreshed() {
    document.documentElement.classList.add(config.name);
}

/**
 * Defreshes the page.
 *
 * @param location Page's URL. Can be either absolute or relative.
 */
export async function defresh(location = window.location.href) {
    let backupContainer = document.createElement("backup");
    for (let fixer of allFixers) {
        if (await fixer.isApplieble(location, backupContainer) && await fixer.waitUntilFixerReady(location, backupContainer))
            try {
                await fixer.apply(location, backupContainer);
            } catch (e) {
                console.log("Fixer exception: ", e);
            }
    }
}

export default defresh;
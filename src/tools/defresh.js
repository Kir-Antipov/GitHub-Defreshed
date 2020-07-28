import allFixers from "../fixers/all-fixers";
import { name } from "../../package.json";


export function isDefreshed() {
    return document.documentElement.classList.contains(name);
}

export function markAsDefreshed() {
    document.documentElement.classList.add(name);
}

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
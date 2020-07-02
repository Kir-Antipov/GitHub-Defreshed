import allFixers from "../fixers/all-fixers";

export default async function defresh(location = window.location.href) {
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
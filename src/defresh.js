import allFixers from "./fixers/all-fixers";

export default async function defresh(location = window.location.href) {
    let backupDocument = document.cloneNode(true);
    for (let fixer of allFixers) {
        if (fixer.isApplieble(location, backupDocument) && await fixer.waitUntilFixerReady())
            try {
                fixer.apply(location, backupDocument);
            } catch (e) { 
                console.log("Fixer exception: ", e);
            }
    }
}
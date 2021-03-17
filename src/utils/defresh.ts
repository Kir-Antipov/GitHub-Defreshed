import fixers from "@fixers";
import config from "@config";
import Stopwatch from "@utils/stopwatch";

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
    let measurements: [string, number, number, number][];
    if (IS_DEBUG) {
        measurements = [];
        console.log("Start of the defreshing process...");
    }

    const backupContainer = document.createElement("backup");
    for (const fixer of fixers) {
        let fixerTime: Stopwatch;
        let fixerWaitingTime: Stopwatch;
        if (IS_DEBUG) {
            fixerTime = Stopwatch.startNew();
            fixerWaitingTime = Stopwatch.startNew();
            console.log(`Executing ${fixer.constructor.name}...`);
        }

        if (await fixer.isApplieble(location, backupContainer) && await fixer.waitUntilFixerReady(location, backupContainer)) {
            IS_DEBUG && fixerWaitingTime.stop();
            try {
                await fixer.apply(location, backupContainer);
            } catch (e) {
                console.log("Fixer exception: ", e);
            }
        }

        if (IS_DEBUG) {
            fixerWaitingTime.stop();
            fixerTime.stop();
            measurements.push([
                fixer.constructor.name,
                fixerWaitingTime.elapsedMilliseconds,
                fixerTime.elapsedMilliseconds - fixerWaitingTime.elapsedMilliseconds,
                fixerTime.elapsedMilliseconds,
            ]);
            console.log(`${fixer.constructor.name} completed its work in ${fixerTime.elapsedMilliseconds} ms.`);
        }
    }

    if (IS_DEBUG) {
        const total = measurements.reduce((total, [,,,time]) => total + time, 0);
        const avg = total / measurements.length;

        console.log(`The defreshing process is completed in ${total} ms.`);

        measurements = measurements.sort(([,,,a], [,,,b]) => b - a);
        measurements.push([
            "Total",
            measurements.reduce((total, [,time]) => total + time, 0),
            measurements.reduce((total, [,,time]) => total + time, 0),
            total,
        ]);
        const table = measurements.map(x => ({
            Name: x[0],
            "Waiting Time (ms)": x[1],
            "Execution Time (ms)": x[2],
            "Total Time (ms)": x[3],
            Ratio: x[3] / avg,
        }));

        console.table(table);
    }
}

export default defresh;

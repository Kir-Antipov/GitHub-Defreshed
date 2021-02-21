import { sleep } from "@utils/sleep";
import { isGitHub } from "@utils/host-detector";
import { defresh, isDefreshed, markAsDefreshed } from "@utils/defresh";

/**
 * Script entry point.
 *
 * Injects the script into the page.
 */
async function main() {
    if (!isDefreshed() && isGitHub()) {
        markAsDefreshed();

        const classList = document.documentElement.classList;

        classList.add("defreshing");
        await defresh();
        classList.add("defreshed");

        classList.remove("defreshing");
        await sleep(1500);
        classList.remove("defreshed");
    }
}

main();
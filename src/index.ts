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
        await defresh();
    }
}

main();

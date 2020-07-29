import { sleep } from "./tools/sleep";
import { isGitHub } from "./tools/host-detector";
import { defresh, isDefreshed, markAsDefreshed } from "./tools/defresh";

async function start() {
    if (!isDefreshed() && isGitHub()) {
        markAsDefreshed();

        let classList = document.documentElement.classList;
        classList.add("defreshing");
        await defresh();
        classList.add("defreshed");
        classList.remove("defreshing");
        await sleep(1500);
        classList.remove("defreshed");
    }
}

start();
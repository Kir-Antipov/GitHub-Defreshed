import { isGitHub } from "./tools/host-detector";
import { defresh, isDefreshed, markAsDefreshed } from "./tools/defresh";

if (!isDefreshed() && isGitHub()) {
    markAsDefreshed();
    defresh();
}
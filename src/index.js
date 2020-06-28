import { isGitHub } from "./tools/host-detector";
import defresh from "./tools/defresh";

if (!window.defreshed && isGitHub()) {
    window.defreshed = true;
    defresh();
}
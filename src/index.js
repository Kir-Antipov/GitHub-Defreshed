import { isGitHub } from "./tools/host-detector";
import defresh from "./tools/defresh";

if (isGitHub())
    defresh();
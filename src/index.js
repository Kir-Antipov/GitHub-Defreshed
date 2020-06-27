import { isGitHub } from "./tools/host-detector";
import defresh from "./defresh";

if (isGitHub())
    defresh();
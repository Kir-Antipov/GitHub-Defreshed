import ContainerFixer from "./container-fixer";
import HeaderFixer from "./header-fixer";
import CommitBarFixer from "./commit-bar-fixer";
import LanguageBarFixer from "./language-bar-fixer";
import SummaryFixer from "./summary-fixer";
import TopicsFixer from "./topics-fixer";
import AboutFixer from "./about-fixer";
import EditDetailsFixer from "./edit-details-fixer";
import ColumnsFixer from "./columns-fixer";
import ReadmeFixer from "./readme-fixer";
import LinksFixer from "./links-fixer";
import WindowPopstateFixer from "./window-popstate-fixer";
import UserCSSFixer from "./user-css-fixer";

export default [
    new ContainerFixer(),
    new HeaderFixer(),
    new CommitBarFixer(),
    new LanguageBarFixer(),
    new SummaryFixer(),
    new TopicsFixer(),
    new AboutFixer(),
    new EditDetailsFixer(),
    new ColumnsFixer(),
    new ReadmeFixer(),
    new LinksFixer(),
    new WindowPopstateFixer(),
    new UserCSSFixer()
];
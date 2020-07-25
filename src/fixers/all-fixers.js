import TopicsCSSFixer from "./css/topics-css-fixer";
import SummaryCSSFixer from "./css/summary-css-fixer";
import ButtonsCSSFixer from "./css/buttons-css-fixer";
import AvatarCSSFixer from "./css/avatar-css-fixer";
import BoxCSSFixer from "./css/box-css-fixer";
import ScriptSettingsFixer from "./settings/script-settings-fixer";
import ContainerFixer from "./repository/container-fixer";
import HeaderFixer from "./repository/header-fixer";
import BranchButtonFixer from "./repository/branch-button-fixer";
import CommitBarFixer from "./repository/commit-bar-fixer";
import LanguageBarFixer from "./repository/language-bar-fixer";
import SummaryFixer from "./repository/summary-fixer";
import TopicsFixer from "./repository/topics-fixer";
import AboutFixer from "./repository/about-fixer";
import EditDetailsFixer from "./repository/edit-details-fixer";
import ColumnsFixer from "./repository/columns-fixer";
import ReadmeFixer from "./repository/readme-fixer";
import LinksFixer from "./global/links-fixer";
import WindowPopstateFixer from "./global/window-popstate-fixer";

export default [
    new TopicsCSSFixer(),
    new SummaryCSSFixer(),
    new ButtonsCSSFixer(),
    new AvatarCSSFixer(),
    new BoxCSSFixer(),
    new ScriptSettingsFixer(),
    new ContainerFixer(),
    new HeaderFixer(),
    new BranchButtonFixer(),
    new CommitBarFixer(),
    new LanguageBarFixer(),
    new SummaryFixer(),
    new TopicsFixer(),
    new AboutFixer(),
    new EditDetailsFixer(),
    new ColumnsFixer(),
    new ReadmeFixer(),
    new LinksFixer(),
    new WindowPopstateFixer()
];
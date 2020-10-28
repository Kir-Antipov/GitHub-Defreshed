import CompatibilityCSSFixer from "./css/compatibility-css-fixer";
import OldSchoolCSSFixer from "./css/old-school-css-fixer";
import PreloaderCSSFixer from "./css/preloader-css-fixer";
import ScriptSettingsFixer from "./settings/script-settings-fixer";
import ContainerFixer from "./repository/container-fixer";
import HeaderFixer from "./repository/header-fixer";
import HelpFixer from "./repository/help-fixer";
import BranchButtonFixer from "./repository/branch-button-fixer";
import BranchesFixer from "./repository/branches-fixer";
import CommitBarFixer from "./repository/commit-bar-fixer";
import LanguageBarFixer from "./repository/language-bar-fixer";
import SummaryFixer from "./repository/summary-fixer";
import TopicsFixer from "./repository/topics-fixer";
import AboutFixer from "./repository/about-fixer";
import EditDetailsFixer from "./repository/edit-details-fixer";
import ColumnsFixer from "./repository/columns-fixer";
import ReadmeFixer from "./repository/readme-fixer";
import ProfileTabsFixer from "./profile/tabs-fixer";
import ProfileStatusFixer from "./profile/status-fixer";
import ProfileBlockOrReportFixer from "./profile/block-or-report-fixer";
import LinksFixer from "./global/links-fixer";
import WindowPopstateFixer from "./global/window-popstate-fixer";
import Fixer from "./fixer";

/**
 * All registered fixers.
 *
 * @type {Fixer[]}
 */
export const allFixers = [
    new CompatibilityCSSFixer(),
    new OldSchoolCSSFixer(),
    new PreloaderCSSFixer(),
    new ScriptSettingsFixer(),
    new HeaderFixer(),
    new ContainerFixer(),
    new HelpFixer(),
    new BranchButtonFixer(),
    new BranchesFixer(),
    new CommitBarFixer(),
    new LanguageBarFixer(),
    new SummaryFixer(),
    new TopicsFixer(),
    new AboutFixer(),
    new EditDetailsFixer(),
    new ColumnsFixer(),
    new ReadmeFixer(),
    new ProfileTabsFixer(),
    new ProfileStatusFixer(),
    new ProfileBlockOrReportFixer(),
    new LinksFixer(),
    new WindowPopstateFixer()
];

export default allFixers;
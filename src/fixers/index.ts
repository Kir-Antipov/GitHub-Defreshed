import CompatibilityCSSFixer from "./css/compatibility-css-fixer";
import OldSchoolCSSFixer from "./css/old-school-css-fixer";
import LightHeaderCSSFixer from "./css/light-header-css-fixer";
import PreloaderCSSFixer from "./css/preloader-css-fixer";
import StickyReadmeHeaderCSSFixer from "./css/sticky-readme-header-css-fixer";
import CombinedOldReadmeCSSFixer from "./css/combined-old-readme-css-fixer";
import ToolbarCSSFixer from "./css/toolbar-css-fixer";
import PreloaderStartFixer from "./global/preloader-start-fixer";
import ScriptSettingsFixer from "./settings/script-settings-fixer";
import ContainerFixer from "./repository/container-fixer";
import HeaderFixer from "./repository/header-fixer";
import HelpFixer from "./repository/help-fixer";
import MainBranchNameFixer from "./repository/main-branch-name-fixer";
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
import ThemeSelectorFixer from "./profile/theme-selector-fixer";
import DisableStatusEditorFixer from "./global/disable-status-editor-fixer";
import ProfileStatusFixer from "./profile/status-fixer";
import PjaxFixer from "./global/pjax-fixer";
import LinksFixer from "./global/links-fixer";
import WindowPopstateFixer from "./global/window-popstate-fixer";
import NoticeFixer from "./global/notice-fixer";
import PreloaderEndFixer from "./global/preloader-end-fixer";
import Fixer from "./fixer";

/**
 * All registered fixers.
 */
const fixers: Fixer[] = [
    new PreloaderStartFixer(),
    new PreloaderCSSFixer(),
    new CompatibilityCSSFixer(),
    new OldSchoolCSSFixer(),
    new LightHeaderCSSFixer(),
    new CombinedOldReadmeCSSFixer(),
    new ToolbarCSSFixer(),
    new StickyReadmeHeaderCSSFixer(),
    new ScriptSettingsFixer(),
    new HeaderFixer(),
    new ContainerFixer(),
    new HelpFixer(),
    new MainBranchNameFixer(),
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
    new ThemeSelectorFixer(),
    new DisableStatusEditorFixer(),
    new ProfileStatusFixer(),
    new PjaxFixer(),
    new LinksFixer(),
    new WindowPopstateFixer(),
    new NoticeFixer(),
    new PreloaderEndFixer(),
];

export default fixers;
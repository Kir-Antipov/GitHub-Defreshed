import { FC } from "jsx-dom";
import Language from "./language";
import LanguageGraph from "./language-graph";
import LanguageStats from "./language-stats";

const LanguageBar: FC<{ open?: boolean, langs: Language[] }, JSX.Element> = ({ open, langs }) => (
    <details className="details-reset mb-3" open={open}>
        <summary title="Click for language details">
            <div className="d-flex repository-lang-stats-graph">
                {langs.map(lang => <LanguageGraph lang={lang}/>)}
            </div>
        </summary>
        <div className="repository-lang-stats">
            <ol className="repository-lang-stats-numbers">
                {langs.map(lang => <LanguageStats lang={lang}/>)}
            </ol>
        </div>
    </details>
);

export default LanguageBar;
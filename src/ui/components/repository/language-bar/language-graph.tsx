import { FC } from "jsx-dom";
import Language from "./language";

const LanguageGraph: FC<{ lang: Language }> = ({ lang }) => (
    <span
        className="language-color"
        aria-label={`${lang.name} ${lang.percent}`}
        itemProp="keywords"
        style={{ width: lang.percent, backgroundColor: lang.color }}
    >
        {lang.name}
    </span>
);

export default LanguageGraph;
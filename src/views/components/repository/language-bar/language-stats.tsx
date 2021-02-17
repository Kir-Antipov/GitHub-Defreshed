import { FC } from "jsx-dom";
import Language from "./language";

const LanguageStats: FC<{ lang: Language }, JSX.Element> = ({ lang }) => {
    const TagName = lang.link ? "a" : "span";
    return (
        <li>
            <TagName href={lang.link}>
                <span className="color-block language-color" style={{ backgroundColor: lang.color }} />
                <span className="lang"> {lang.name} </span>
                <span className="percent">{lang.percent}</span>
            </TagName>
        </li>
    );
};

export default LanguageStats;
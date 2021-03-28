import { FC } from "jsx-dom";

interface TabProps {
    href: string;
    icon: JSX.Element;
    text: string;
    count: number | string;
    selected: boolean;
}

const Tab: FC<TabProps> = ({ href, icon, text, count, selected }) => (
    <a href={href} className={["UnderlineNav-item", selected && "selected"]}>
        {icon}
        {text}
        {/* eslint-disable-next-line eqeqeq */}
        { count != 0 &&
            <span className="Counter" title={count as string}>
                {count}
            </span>
        }
    </a>
);

export default Tab;
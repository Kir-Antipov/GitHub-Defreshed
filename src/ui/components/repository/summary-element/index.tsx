import pluralize from "@utils/pluralize";
import { FC } from "jsx-dom";

interface SummaryElementProps {
    icon: JSX.Element;
    href: string;
    text: string;
    count?: number | string;
}

const SummaryElement: FC<SummaryElementProps> = ({ icon, href, text, count }) => (
    <li>
        <a href={href}>
            {icon} {String(count) !== "-1" && <span className="num text-emphasized">{count}</span>} {pluralize(text, count)}
        </a>
    </li>
);

SummaryElement.defaultProps = {
    count: -1
};

export default SummaryElement;
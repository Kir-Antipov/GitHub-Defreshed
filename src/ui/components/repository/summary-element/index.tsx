import pluralize from "@utils/pluralize";
import { FC } from "jsx-dom";

interface SummaryElementProps {
    icon: JSX.Element;
    href: string;
    text: string;
    count?: number | string;
}

const SummaryElement: FC<SummaryElementProps, JSX.Element> = ({ icon, href, text, count }) => (
    <li>
        <a href={href}>
            {icon} {count != -1 && <span className="num text-emphasized">{count}</span>} {pluralize(text, count)}
        </a>
    </li>
);

SummaryElement.defaultProps = {
    count: -1
};

export default SummaryElement;
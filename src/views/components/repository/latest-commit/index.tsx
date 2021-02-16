import { FC } from "jsx-dom";

const parseHashFromUrl = (url: string) => {
    const hashLength = 7;
    const defaultHash = "0000000";
    const parts = (url || defaultHash).split("/");
    const hash = parts.length && parts[parts.length - 1];
    return hash.slice(0, hashLength);
};

const LatestCommit: FC<{ href: string, datetime: string }, JSX.Element> = ({ href, datetime }) => (
    <div className="css-truncate css-truncate-overflow text-gray">
        Latest commit
        {" "}
        <a href={href} class="f6 link-gray text-mono d-none d-lg-inline">
            {parseHashFromUrl(href)}
        </a>
        {" "}
        <relative-time datetime={datetime} class="no-wrap"/>
    </div>
);

export default LatestCommit;
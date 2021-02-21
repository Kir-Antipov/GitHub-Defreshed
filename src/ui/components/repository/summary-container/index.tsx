import { FC } from "jsx-dom";

const SummaryContainer: FC<{ rounded?: boolean }> = ({ rounded, children }) => (
    <div class={["overall-summary", "mt-3", rounded ? "mb-3" : ["border-bottom-0", "mb-0", "rounded-bottom-0"]]}>
        <ul className="numbers-summary">
            {children}
        </ul>
    </div>
);

SummaryContainer.defaultProps = {
    rounded: true
};

export default SummaryContainer;
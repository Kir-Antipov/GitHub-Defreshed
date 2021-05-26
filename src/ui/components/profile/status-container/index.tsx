import { FC } from "jsx-dom";

interface StatusContainerProps {
    emoji: JSX.Element;
    text: string;
    isBusy?: boolean;
    dialog?: JSX.Element;
}

const StatusContainer: FC<StatusContainerProps> = ({ emoji, text, isBusy, dialog }) => {
    const DetailsTag = dialog ? "details" : "div";
    const SummaryTag = dialog ? "summary" : "div";

    return (
        <DetailsTag
            className={[
                "user-status-container", "border", "position-relative", "hide-sm", "bg-white", "hide-md",
                dialog && ["details-reset", "details-overlay", "details-overlay-dark"],
                isBusy && "color-border-warning",
            ]}
        >
            <SummaryTag className="d-flex">
                <div
                    className={[
                        "d-flex", "p-2", "width-full", "border-0", "rounded-bottom-0",
                        isBusy && "color-bg-warning",
                    ]}
                >
                    <div className="flex-self-start mr-1 ml-1">
                        <div>{emoji}</div>
                    </div>
                    <div className="user-status-message-wrapper f6 mt-1 text-gray-dark ws-normal">
                        <div>
                            <div>{text}</div>
                        </div>
                    </div>
                </div>
            </SummaryTag>
            {dialog}
        </DetailsTag>
    );
};

StatusContainer.defaultProps = {
    isBusy: false,
    dialog: null
};

export default StatusContainer;
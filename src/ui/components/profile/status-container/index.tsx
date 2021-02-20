import { FC } from "jsx-dom";

interface StatusContainerProps {
    emoji: JSX.Element;
    text: string;
    isBusy?: boolean;
    dialog?: JSX.Element;
}

const StatusContainer: FC<StatusContainerProps, JSX.Element> = ({ emoji, text, isBusy, dialog }) => {
    const DetailsTag = dialog ? "details" : "div";
    const SummaryTag = dialog ? "summary" : "div";

    return (
        <DetailsTag
            class={[
                "user-status-container", "border", "position-relative", "hide-sm", "bg-white", "hide-md",
                dialog
                    ? ["details-reset", "details-overlay", "details-overlay-dark"]
                    : null
            ]}
        >
            <SummaryTag className="d-flex">
                <div
                    class={[
                        "d-flex", "p-2", "width-full", "border-0", "rounded-bottom-0",
                        isBusy
                            ? ["user-status-container-border-busy", "bg-yellow-light", "border-yellow"]
                            : null
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
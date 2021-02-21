import { FC } from "jsx-dom";

const ActionsContainer: FC = ({ children }) => (
    <div className="pt-3">
        {(children as Array<JSX.Element>).map(x => {
            const summary = x?.querySelector?.("summary");
            if (summary) {
                summary.className = "btn-link text-small muted-link my-1";
            }
            return x;
        })}
    </div>
);

export default ActionsContainer;
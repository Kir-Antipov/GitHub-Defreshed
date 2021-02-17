import { FC } from "jsx-dom";

const BuildStatusesContainer: FC<{}, JSX.Element> = ({ children }) => (
    <div className="ml-1">
        {children}
    </div>
);

export default BuildStatusesContainer;
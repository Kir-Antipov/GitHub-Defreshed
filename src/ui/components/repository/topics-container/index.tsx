import { FC } from "jsx-dom";

const TopicsContainer: FC = ({ children }) => (
    <div className="repository-topics-container mt-3 mb-3 js-topics-list-container">
        {children}
    </div>
);

export default TopicsContainer;
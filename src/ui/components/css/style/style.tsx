import { FC } from "jsx-dom";

const Style: FC<{ name: string }, JSX.Element> = ({ name, children }) => (
    <style type="text/css" {...{ [name]: "" }}>
        {children}
    </style>
);

export default Style;
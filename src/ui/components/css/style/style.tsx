import { FC } from "jsx-dom";

const Style: FC<{ name: string }> = ({ name, children }) => (
    <style type="text/css" {...{ [name]: "" }}>
        {children}
    </style>
);

export default Style;
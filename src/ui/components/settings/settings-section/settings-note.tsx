import { FC } from "jsx-dom";

const SettingsNote: FC<{ text?: string }> = ({ text }) => {
    if (!text || !(text = text.trim())) {
        return null;
    }

    return (
        <div className="note">
            {text.split("\n").filter(x => x).map(x => <div>{x}</div>)}
        </div>
    );
};

export default SettingsNote;
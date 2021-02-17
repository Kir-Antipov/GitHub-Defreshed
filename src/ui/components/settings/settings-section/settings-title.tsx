import config from "@config";

const SettingsTitle = () => (
    <div className="Subhead Subhead--spacious">
        <h2 className="Subhead-heading">
            {config.displayName} settings
        </h2>
    </div>
);

export default SettingsTitle;
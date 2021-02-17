import settings from "@utils/settings";
import SettingsDynamicInput from "./settings-dynamic-input";

export default function SettingsForm() {
    return (
        <form className="edit_user">
            {settings.map(x => <SettingsDynamicInput property={x}/>)}
            <button className="btn" onClick={e => { e.preventDefault(); location.reload(); }}>
                Update preference
            </button>
        </form>
    );
}
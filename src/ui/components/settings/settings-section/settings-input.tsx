import { Component } from "jsx-dom";
import { SettingsProperty } from "@utils/settings";

interface SettingsInputProps<T> {
    property: SettingsProperty<T>
}

export default abstract class SettingsInput<T = unknown> extends Component<SettingsInputProps<T>> {
    get id() {
        return `github-defreshed_${this.props.property.name}`;
    }

    protected constructor(props: SettingsInputProps<T>) {
        super(props);
    }

    abstract render(): JSX.Element;
}
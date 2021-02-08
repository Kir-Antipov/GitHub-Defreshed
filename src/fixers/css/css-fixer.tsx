import { waitUntilHeadReady } from "@utils/wait-until-ready";
import { SettingsProperty } from "@utils/settings";
import config from "@config";
import Fixer from "@fixers/fixer";

/**
 * Base class for css injectors.
 */
export default class CSSFixer extends Fixer {
    _option: SettingsProperty<boolean>;
    _css: string;
    _name: string;

    /**
     * Initializes a new instance of the CSSFixer class.
     *
     * @param option
     * Settings option that indicates whether to apply this fixer.
     *
     * @param css CSS to be injected.
     *
     * @param name This fixer's name.
     */
    constructor(option: SettingsProperty<boolean>, css: string, name: string) {
        super();
        this._css = css.toString();
        this._option = option;
        this._name = `${config.name}-${name}`;
    }

    async isApplieble() {
        return await this._option.getValue() && !document.querySelector(`head > style[${this._name}]`);
    }

    waitUntilFixerReady() {
        return waitUntilHeadReady();
    }

    apply() {
        document.head.append(
            <style type="text/css" {...{ [this._name]: "" }}>
                {this._css}
            </style>
        );
    }
}
import { waitUntilHeadReady } from "@utils/wait-until-ready";
import { SettingsProperty } from "@utils/settings";
import config from "@config";
import Fixer from "@fixers/fixer";
import Style from "@components/css/style/style";

/**
 * Base class for css injectors.
 */
export default class CSSFixer extends Fixer {
    private option: SettingsProperty<boolean>;
    private css: string;
    private name: string;

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
        this.css = css.toString();
        this.option = option;
        this.name = `${config.name}-${name}`;
    }

    async isApplieble() {
        return await this.option.getValue() && !document.querySelector(`head > style[${this.name}]`);
    }

    waitUntilFixerReady() {
        return waitUntilHeadReady();
    }

    apply() {
        document.head.append(
            <Style name={this.name}>
                {this.css}
            </Style>
        );
    }
}
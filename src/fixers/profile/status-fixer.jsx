import { isProfile } from "../../utils/path-detector";
import { checkIfElementsReady } from "../../utils/wait-until-ready";
import settings from "../../utils/settings";
import submitForm from "../../utils/submit-form";
import Fixer from "../fixer";

/**
 * Returns the classic look of user's status.
 */
export default class StatusFixer extends Fixer {
    /** @inheritdoc */
    async isApplieble(location) {
        return await settings.defreshProfilePage.getValue() && await settings.defreshProfilePageUserStatus.getValue() && isProfile(location);
    }

    /** @inheritdoc */
    waitUntilFixerReady() {
        return checkIfElementsReady("main:nth-child(1) .user-status-container");
    }

    /** @inheritdoc */
    apply() {
        let statusContainer = document.querySelector("main .user-status-container");
        let emoji = statusContainer.querySelector("img") || statusContainer.querySelector("g-emoji");
        let textContainer = statusContainer.querySelector(".user-status-message-wrapper");
        let text = textContainer ? textContainer.innerText.trim() : "";
        let isBusy = !!statusContainer.querySelector(".user-status-busy");
        let details = statusContainer.querySelector("details-dialog");

        this._fixDetails(details);
        statusContainer.replaceWith(this._createStatusContainer(emoji, text, isBusy, details));

        let avatar = document.querySelector("main img.avatar");
        if (avatar)
            avatar.classList.add("avatar-before-user-status");
    }

    /**
     * Creates old school status block.
     *
     * @param {HTMLElement} emoji Status' emoji.
     * @param {string} text Status' text.
     * @param {boolean} isBusy Indicates whether the user is busy.
     * @param {HTMLElement} details Status' editor.
     *
     * @returns {HTMLElement} Defreshed status block.
     */
    _createStatusContainer(emoji, text, isBusy = false, details = null) {
        let DetailsTag = details ? "details" : "div";
        let SummaryTag = details ? "summary" : "div";
        return (
            <DetailsTag className={"user-status-container border position-relative hide-sm bg-white hide-md" + (details ? " details-reset details-overlay details-overlay-dark" : "")}>
                <SummaryTag className="d-flex">
                    <div className={"d-flex p-2 width-full border-0 rounded-bottom-0" + (isBusy ? " user-status-container-border-busy bg-yellow-light border-yellow" : "")}>
                        <div className="flex-self-start mr-1 ml-1">
                            <div>{emoji}</div>
                        </div>
                        <div className="user-status-message-wrapper f6 mt-1 text-gray-dark ws-normal">
                            <div>
                                <div>{text}</div>
                            </div>
                        </div>
                    </div>
                </SummaryTag>
                {details}
            </DetailsTag>
        );
    }

    /**
     * Fixes status' editor.
     *
     * @param {HTMLElement} details Status' editor.
     */
    _fixDetails(details) {
        if (!details)
            return;

        this._fixDetailsFragments(details);
        this._fixDetailsEmojis(details);
        this._fixDetailsButtons(details);
    }

    /**
     * Initiates loading of editor's content.
     *
     * @param {HTMLElement} details Status' editor.
     */
    _fixDetailsFragments(details) {
        for (let fragment of [...details.querySelectorAll("include-fragment")])
            fragment.setAttribute("src", fragment.getAttribute("data-url"));
    }

    /**
     * Fixes editor's emojis.
     *
     * @param {HTMLElement} details Status' editor.
     */
    _fixDetailsEmojis(details) {
        let emojiContainer = details.querySelector(".js-user-status-custom-emoji");
        let emojiInput = details.querySelector("form").emoji;
        let openPicker = details.querySelector(".btn.js-toggle-user-status-emoji-picker");
        openPicker.addEventListener("click", e => {
            e.preventDefault();
            e.stopPropagation();
            let picker = details.querySelector("emoji-picker");
            if (picker) {
                this._fixEmojiPicker(emojiContainer, emojiInput, picker);
                picker.open();
            }
        });
    }

    /**
     * Fixes editor's emoji picker.
     *
     * @param {HTMLElement} targetContainer Emoji container.
     * @param {HTMLInputElement} targetInput Emoji input.
     * @param {HTMLElement} picker Emoji picker.
     */
    _fixEmojiPicker(targetContainer, targetInput, picker) {
        if (picker.fixed)
            return;

        for (let btn of [...picker.querySelectorAll(".js-emoji-button")])
            btn.addEventListener("click", function (e) {
                e.preventDefault();
                targetInput.value = this.getAttribute("value");
                let emoji = this.children[0].cloneNode(true);
                emoji.removeAttribute("width");
                emoji.removeAttribute("height");
                targetContainer.children[0].replaceWith(<div>{emoji}</div>);
                picker.close();
            });

        picker.fixed = true;
    }

    /**
     * Fixes editor's submit button.
     *
     * @param {HTMLElement} details Status' editor.
     */
    _fixDetailsButtons(details) {
        let submitButton = details.querySelector("form button[type='submit']");
        let clearButton = submitButton.parentElement.querySelector("button:not([type='submit'])");

        submitButton.addEventListener("click", async function (e) {
            e.preventDefault();
            await submitForm(this.form);
            location.reload();
        });
        clearButton.addEventListener("click", async function(e) {
            e.preventDefault();

            let form = this.form;
            form.emoji.value = "";
            form.message.value = "";
            form.limited_availability.value = "0";

            await submitForm(this.form);
            location.reload();
        });
    }
}
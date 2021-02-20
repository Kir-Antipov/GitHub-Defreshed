import { isProfile } from "@utils/path-detector";
import { checkIfElementsReady } from "@utils/wait-until-ready";
import settings from "@utils/settings";
import submitForm from "@utils/submit-form";
import StatusContainer from "@components/profile/status-container";
import Fixer from "@fixers/fixer";

interface HTMLEmojiPickerElement extends HTMLElement {
    open: () => void;
    close: () => void;
    fixed: boolean;
}

/**
 * Returns the classic look of user's status.
 */
export default class StatusFixer extends Fixer {
    async isApplieble(location: string) {
        return (
            await settings.defreshProfilePage.getValue() &&
            await settings.defreshProfilePageUserStatus.getValue() &&
            isProfile(location)
        );
    }

    waitUntilFixerReady() {
        return checkIfElementsReady("main:nth-child(1) .user-status-container");
    }

    apply() {
        const statusContainer = document.querySelector("main .user-status-container");
        const emoji = statusContainer.querySelector("img") || statusContainer.querySelector("g-emoji");
        const textContainer = statusContainer.querySelector<HTMLElement>(".user-status-message-wrapper");
        const text = textContainer?.innerText.trim() || "";
        const isBusy = !!statusContainer.querySelector(".user-status-busy");
        const dialog = statusContainer.querySelector<HTMLElement>("details-dialog");

        this.fixDialog(dialog);
        statusContainer.replaceWith(
            <StatusContainer {...{ emoji, text, isBusy, dialog }} />
        );

        const avatar = document.querySelector("main img.avatar");
        if (avatar) {
            avatar.classList.add("avatar-before-user-status");
        }
    }

    /**
     * Fixes status' editor.
     */
    private fixDialog(dialog?: HTMLElement) {
        if (!dialog) {
            return;
        }

        this.fixDialogFragments(dialog);
        this.fixDialogEmojis(dialog);
        this.fixDialogButtons(dialog);
    }

    /**
     * Initiates loading of editor's content.
     */
    private fixDialogFragments(dialog: HTMLElement) {
        for (const fragment of [...dialog.querySelectorAll("include-fragment")]) {
            fragment.setAttribute("src", fragment.getAttribute("data-url"));
        }
    }

    /**
     * Fixes editor's emojis.
     */
    private fixDialogEmojis(dialog: HTMLElement) {
        const emojiContainer = dialog.querySelector<HTMLElement>(".js-user-status-custom-emoji");
        const emojiInput = dialog.querySelector("form").emoji;
        const openPicker = dialog.querySelector(".btn.js-toggle-user-status-emoji-picker");
        openPicker.addEventListener("click", e => {
            e.preventDefault();
            e.stopPropagation();
            const picker = dialog.querySelector<HTMLEmojiPickerElement>("emoji-picker");
            if (picker) {
                this.fixEmojiPicker(emojiContainer, emojiInput, picker);
                picker.open();
            }
        });
    }

    /**
     * Fixes editor's emoji picker.
     */
    private fixEmojiPicker(targetContainer: HTMLElement, targetInput: HTMLInputElement, picker: HTMLEmojiPickerElement) {
        if (picker.fixed) {
            return;
        }

        for (const btn of [...picker.querySelectorAll(".js-emoji-button")])
            btn.addEventListener("click", function (e) {
                e.preventDefault();

                targetInput.value = this.getAttribute("value");

                const emoji = this.children[0].cloneNode(true);
                emoji.removeAttribute("width");
                emoji.removeAttribute("height");
                targetContainer.children[0].replaceWith(<div>{emoji}</div>);

                picker.close();
            });

        picker.fixed = true;
    }

    /**
     * Fixes editor's submit button.
     */
    private fixDialogButtons(dialog: HTMLElement) {
        const submitButton = dialog.querySelector("form button[type='submit']");
        const clearButton = submitButton.parentElement.querySelector("button:not([type='submit'])");

        submitButton.addEventListener("click", async function (e) {
            e.preventDefault();
            await submitForm(this.form);
            location.reload();
        });
        clearButton.addEventListener("click", async function (e) {
            e.preventDefault();

            const form = this.form;
            form.emoji.value = "";
            form.message.value = "";
            form.limited_availability.value = "0";

            await submitForm(this.form);
            location.reload();
        });
    }
}
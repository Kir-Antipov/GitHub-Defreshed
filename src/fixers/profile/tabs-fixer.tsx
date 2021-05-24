import { isProfile } from "@utils/path-detector";
import { is404, isOrganizationPage } from "@utils/page-detector";
import { waitUntilElementsReady } from "@utils/wait-until-ready";
import settings from "@utils/settings";
import Tab from "@components/profile/tab";
import { PeopleIcon } from "@primer/octicons-react";
import Fixer from "@fixers/fixer";

/**
 * Moves tabs to tabs container ¯\\_(ツ)_/¯
 */
export default class TabsFixer extends Fixer {
    async isApplieble(location: string) {
        return (
            await settings.defreshProfilePage &&
            isProfile(location) &&
            !(isOrganizationPage() || is404())
        );
    }

    waitUntilFixerReady() {
        return waitUntilElementsReady("main:nth-child(1) nav", "main:nth-child(1) div.js-profile-editable-area > :not(.js-user-profile-bio)[class]:not(.vcard-details):last-of-type");
    }

    async apply(location: string) {
        const container = document.querySelector<HTMLElement>("main div.js-profile-editable-area > :not(.js-user-profile-bio)[class]:not(.vcard-details):last-of-type");

        const tabs = document.querySelector<HTMLElement>("main nav");
        tabs.style.overflow = "hidden";
        tabs.append(...this.generateTabs(container, location));

        container.remove();

        if (!await settings.keepProfilePageIcons) {
            for (const icon of tabs.querySelectorAll("svg")) {
                icon.style.display = "none";
            }
        }
    }

    /**
     * Generates Stars/Followers/Following tabs.
     *
     * @param container Profile details container.
     * @param location Page's URL.
     */
    private generateTabs(container: HTMLElement, location: string) {
        const defaultIcons = new Map([
            ["stars", null],
            ["followers", null],
            ["following", <PeopleIcon />],
        ]);
        const tabNames = [...defaultIcons.keys()];

        return [...container.querySelectorAll("a")]
            .filter(x => defaultIcons.has(this.getTabName(x.href)))
            .sort((a, b) => tabNames.indexOf(this.getTabName(a.href)) - tabNames.indexOf(this.getTabName(b.href)))
            .map(x => this.generateTab(location, x, defaultIcons.get(this.getTabName(x.href))))
            .filter(x => x);
    }

    /**
     * Parses tab's name from url.
     */
    private getTabName(href: string) {
        const separatorIndex = href.indexOf("?");
        if (separatorIndex === -1) {
            return "";
        }
        return new URLSearchParams(href.substring(separatorIndex)).get("tab");
    }

    /**
     * Generates tab.
     *
     * @param location Page's URL.
     * @param element Element that contains tab's data.
     * @param defaultIcon Default icon.
     */
    private generateTab(location: string, element: HTMLAnchorElement, defaultIcon: JSX.Element = null) {
        const icon = element.querySelector("svg") || defaultIcon;
        icon?.classList.add("UnderlineNav-octicon");

        let text = this.getTabName(element.href).trim();
        text = text[0].toUpperCase() + text.slice(1);

        const counter = element.querySelector("span");
        const count = counter?.innerText?.trim() || 0;

        return (
            <Tab
                href={element.href}
                selected={this.getTabName(location) === this.getTabName(element.href)}
                icon={icon}
                text={text}
                count={count}
            />
        );
    }
}
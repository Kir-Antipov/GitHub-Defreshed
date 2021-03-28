import defresh from "@utils/defresh";
import { isRoot, isProject } from "@utils/path-detector";
import settings from "@utils/settings";

/**
 * Updates the current location.
 *
 * @param link Actual page URL.
 */
function setLocation(link: string) {
    try {
        history.pushState(null, null, link);
    } catch {
        location.hash = "#" + link;
    }
}

/**
 * Shows a dummy progress bar at the top of the page.
 */
function imitateLoading() {
    const loader = document.querySelector<HTMLElement>(".progress-pjax-loader");
    if (loader) {
        const bar = loader.firstElementChild as HTMLElement;
        const loadingTime = 1200;
        const step = 100;

        bar.style.width = "0";
        loader.style.opacity = "100%";
        for (let i = 0; i < loadingTime; i += step) {
            let percentValue = Math.floor((Math.exp(i / loadingTime) - 1) / (Math.E - 1) * 100);
            percentValue = Math.min(percentValue, 100);
            setTimeout(() => bar.style.width = `${percentValue}%`, i);
        }
        setTimeout(() => loader.style.opacity = "0", loadingTime + step);
    }
}

/**
 * Loads a document from the specified address.
 *
 * @param link The address of the page to download.
 *
 * @returns
 * Returns the document and its final address
 * (it may differ from the passed parameter if there was a redirect).
 */
async function getDocumentAndURL(link: string) {
    imitateLoading();
    const response = await fetch(link);
    return {
        document: new DOMParser().parseFromString(await response.text(), "text/html"),
        url : response.url
    };
}

/**
 * Retrieves script's src value.
 *
 * @param scriptElement The script element.
 *
 * @returns The URL to an external file that contains the source code.
 */
function getScriptSrc(scriptElement: HTMLScriptElement) {
    return scriptElement.src || scriptElement.getAttribute("data-src");
}

/**
 * Updates document's header.
 *
 * @param newDocument New header source.
 */
function updateHeader(newDocument: Document) {
    const oldHeader = document.querySelector("header");
    const newHeader = newDocument.querySelector("header");
    if (oldHeader && newHeader) {
        oldHeader.replaceWith(newHeader);
    }
}

/**
 * Loads scripts into the document that haven't been added previously.
 *
 * @param newDocument New scripts source.
 */
function updateScripts(newDocument: Document) {
    const activeScripts = [...document.querySelectorAll("script")];
    const newScripts = [...newDocument.querySelectorAll("script")];
    const inactiveScripts = newScripts
        .map(getScriptSrc)
        .filter(src => !activeScripts.some(activeScript => getScriptSrc(activeScript) === src))
        .map(src => <script src={src}/>);
    document.body.append(...inactiveScripts);
}

/**
 * Updates the document with the new data.
 *
 * @param newDocument Update source.
 */
function updateDocument(newDocument: Document) {
    // body's class is important for some css rules
    document.body.className = newDocument.body.className;

    // Update page's title
    document.head.querySelector("title").innerText = newDocument.head.querySelector("title").innerText;

    // The functionality of the header's search bar changes depending on the page
    updateHeader(newDocument);

    // GitHub requires a different set of scripts depending on the page
    updateScripts(newDocument);
}

/**
 * Dynamically loads a new page and substitutes its content into the current one.
 *
 * @param link The address of the page to download.
 * @param changeLocation Indicates whether to update the current page URL.
 */
export async function navigate(link = window.location.href, changeLocation = true) {
    const root = isRoot();
    const project = isProject();

    const result = await getDocumentAndURL(link);
    const newMain = result.document.querySelector("main");
    newMain.style.display = "none";

    if (root) {
        const app = document.querySelector("body > div.application-main");
        app.prepend(
            <div itemScope={true} itemType="http://schema.org/SoftwareSourceCode">
                <main/>
            </div>
        );
    }
    const oldMain = document.querySelector("main");
    oldMain.parentElement.insertBefore(newMain, oldMain);

    await defresh(result.url);

    oldMain.replaceWith(newMain);
    if (root) {
        const app = document.querySelector("body > div.application-main");
        for (const child of [...app.children].splice(1)) {
            app.removeChild(child);
        }
    } else if (project) {
        newMain.parentElement.className = "";
    }
    newMain.style.display = "";

    if (await settings.jumpToTop) {
        window.scrollTo(0, 0);
    }

    updateDocument(result.document);

    if (changeLocation) {
        setLocation(result.url);
    }
}

export default navigate;
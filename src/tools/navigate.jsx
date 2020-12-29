import defresh from "./defresh";
import { isRoot, isProject } from "./path-detector";
import settings from "./settings";

/**
 * Updates the current location.
 *
 * @param {string} link Actual page URL.
 */
function setLocation(link) {
    try {
        history.pushState(null, null, link);
    } catch (_) {
        location.hash = "#" + link;
    }
}

/**
 * Shows a dummy progress bar at the top of the page.
 */
function imitateLoading() {
    let loader = document.querySelector(".progress-pjax-loader");
    if (loader) {
        const loadingTime = 1200;
        const step = 100;

        loader.firstElementChild.style.width = 0;
        loader.style.opacity = "100%";
        for (let i = 0; i < loadingTime; i += step) {
            let percentValue = Math.floor((Math.exp(i / loadingTime) - 1) / (Math.E - 1) * 100);
            percentValue = Math.min(percentValue, 100);
            setTimeout(() => loader.firstElementChild.style.width = `${percentValue}%`, i);
        }
        setTimeout(() => loader.style.opacity = 0, loadingTime + step);
    }
}

/**
 * Loads a document from the specified address.
 *
 * @param {string} link The address of the page to download.
 *
 * @returns {Promise<{ document: Document, url: string }>}
 * Returns the document and its final address
 * (it may differ from the passed parameter if there was a redirect).
 */
async function getDocumentAndURL(link) {
    imitateLoading();
    let response = await fetch(link);
    return {
        document: new DOMParser().parseFromString(await response.text(), "text/html"),
        url : response.url
    };
}

/**
 * Retrieves script's src value.
 *
 * @param {HTMLScriptElement} scriptElement The script element.
 *
 * @returns {string} The URL to an external file that contains the source code.
 */
function getScriptSrc(scriptElement) {
    return scriptElement.src || scriptElement.getAttribute("data-src");
}

/**
 * Updates document's header.
 *
 * @param {Document} newDocument New header source.
 */
function updateHeader(newDocument) {
    let oldHeader = document.querySelector("header");
    let newHeader = newDocument.querySelector("header");
    if (oldHeader && newHeader)
        oldHeader.replaceWith(newHeader);
}

/**
 * Loads scripts into the document that haven't been added previously.
 *
 * @param {Document} newDocument New scripts source.
 */
function updateScripts(newDocument) {
    let activeScripts = [...document.querySelectorAll("script")];
    let newScripts = [...newDocument.querySelectorAll("script")];
    let inactiveScripts = newScripts
        .map(getScriptSrc)
        .filter(src => !activeScripts.some(activeScript => getScriptSrc(activeScript) == src))
        .map(src => <script src={src}/>);
    document.body.append(...inactiveScripts);
}

/**
 * Updates the document with the new data.
 *
 * @param {Document} newDocument Update source.
 */
function updateDocument(newDocument) {
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
 * @param {string} link The address of the page to download.
 * @param {boolean} changeLocation Indicates whether to update the current page URL.
 */
export async function navigate(link = window.location.href, changeLocation = true) {
    let root = isRoot();
    let project = isProject();

    let result = await getDocumentAndURL(link);
    let newMain = result.document.querySelector("main");
    newMain.style.display = "none";

    if (root) {
        let app = document.querySelector("body > div.application-main");
        app.prepend(
            <div itemScope="" itemType="http://schema.org/SoftwareSourceCode"><main/></div>
        );
    }
    let oldMain = document.querySelector("main");
    oldMain.parentElement.insertBefore(newMain, oldMain);

    await defresh(result.url);

    oldMain.replaceWith(newMain);
    if (root) {
        let app = document.querySelector("body > div.application-main");
        for (let child of [...app.children].splice(1))
            app.removeChild(child);
    } else if (project) {
        newMain.parentElement.className = "";
    }
    newMain.style.display = "";

    if (settings.jumpToTop.value)
        window.scrollTo(0, 0);

    updateDocument(result.document);

    if (changeLocation)
        setLocation(result.url);
}

export default navigate;
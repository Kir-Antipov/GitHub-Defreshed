import defresh from "./defresh";
import { isRoot, isProject } from "./path-detector";
import createElement from "./create-element";
import settings from "./settings";

function setLocation(link) {
    try {
        history.pushState(null, null, link);
    } catch (_) {
        location.hash = "#" + link;
    }
}

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

async function getDocumentAndURL(link) {
    imitateLoading();
    let response = await fetch(link);
    return {
        document: new DOMParser().parseFromString(await response.text(), "text/html"),
        url : response.url
    };
}

function getScriptSrc(scriptElement) {
    return scriptElement.src || scriptElement.getAttribute("data-src");
}

function updateHeader(newDocument) {
    let oldHeader = document.querySelector("header");
    let newHeader = newDocument.querySelector("header");
    if (oldHeader && newHeader)
        oldHeader.replaceWith(newHeader);
}

function updateScripts(newDocument) {
    let activeScripts = [...document.querySelectorAll("script")];
    let newScripts = [...newDocument.querySelectorAll("script")];
    let inactiveScripts = newScripts
        .map(getScriptSrc)
        .filter(src => !activeScripts.some(activeScript => getScriptSrc(activeScript) == src))
        .map(src => createElement("script", { src }));
    document.body.append(...inactiveScripts);
}

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

export default async function navigate(link = window.location.href, changeLocation = true) {
    let root = isRoot();
    let project = isProject();

    let result = await getDocumentAndURL(link);
    let newMain = result.document.querySelector("main");
    newMain.style.display = "none";

    if (root) {
        let app = document.querySelector("body > div.application-main");
        app.prepend(createElement("div", {
            className: "",
            attributes: {
                itemscope: "",
                itemtype: "http://schema.org/SoftwareSourceCode"
            },
            children: [
                createElement("main")
            ]
        }));
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
        window.scrollTo(0,0);

    updateDocument(result.document);

    if (changeLocation)
        setLocation(result.url);
}
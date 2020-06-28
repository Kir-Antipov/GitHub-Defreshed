import defresh from "./defresh";
import { sleep } from "./sleep";
import { isRoot } from "./path-detector";
import createElement from "./create-element";

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
        loader.firstElementChild.style.width = "0";
        loader.style.opacity = "100%";
        loader.firstElementChild.style.width = "10%";
        setTimeout(() => loader.firstElementChild.style.width = "25%", 250);
        setTimeout(() => loader.firstElementChild.style.width = "60%", 500);
        setTimeout(() => loader.firstElementChild.style.width = "80%", 700);
        setTimeout(() => loader.firstElementChild.style.width = "100%", 900);
        setTimeout(() => loader.style.opacity = 0, 1000);
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

export default async function navigate(link = window.location.href, changeLocation = true) {
    let root = isRoot();

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
        document.body.className = "logged-in env-production page-responsive intent-mouse";
    }
    newMain.style.display = "";

    if (changeLocation)
        setLocation(result.url);
}
import defresh from "./defresh";
import { isRoot, isProject } from "./path-detector";
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
        document.body.className = "logged-in env-production page-responsive intent-mouse";
    } else if (project) {
        newMain.parentElement.className = "";
    }
    newMain.style.display = "";
    document.head.querySelector("title").innerText = result.document.head.querySelector("title").innerText;

    if (changeLocation)
        setLocation(result.url);
}
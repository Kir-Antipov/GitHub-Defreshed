import defresh from "../defresh";

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

async function getDocument(link) {
    imitateLoading();
    let response = await fetch(link);
    return new DOMParser().parseFromString(await response.text(), "text/html");
}

export default async function navigate(link = window.location.href, changeLocation = true) {
    let _document = await getDocument(link);
    defresh(_document, link);
    
    let oldMain = document.querySelector("main");
    let newMain = _document.querySelector("main");
    if (oldMain && newMain)
        oldMain.replaceWith(newMain);
    else
        document.body.replaceWith(_document.body);

    if (changeLocation)
        setLocation(link);
}
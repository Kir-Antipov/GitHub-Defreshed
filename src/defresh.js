import allFixers from "./fixers/all-fixers";

export default function defresh(_document = document, location = window.location.href) {
    let src = _document.cloneNode(true);
    let dest = _document;
    for (let fixer of allFixers) {
        if (fixer.isApplieble(dest, src, location))
            try {
                fixer.apply(dest, src, location);
            } catch (e) { 
                console.log("Fixer exception: ", e);
            }
    }
}
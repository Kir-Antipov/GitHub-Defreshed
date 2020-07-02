function getRules(styleSheet) {
    try {
        return [...(styleSheet.rules || styleSheet.cssRules)];
    } catch (_) {
        return [];
    }
}

export function findRule(selector) {
    return [...document.styleSheets].filter(styleSheet => 
        styleSheet.href).flatMap(getRules).find(rule => 
            rule.selectorText && rule.selectorText == selector);
}
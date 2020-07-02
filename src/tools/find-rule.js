export function findRule(selector) {
    return [...document.styleSheets].filter(styleSheet => 
        styleSheet.href).flatMap(styleSheet => [...(styleSheet.rules || styleSheet.cssRules || [])]).find(rule => 
            rule.selectorText && rule.selectorText == selector);
}
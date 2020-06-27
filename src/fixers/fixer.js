export default class Fixer {
    isApplieble(location = window.location.href, backup = null) {
        return true;
    }

    waitUntilFixerReady() {
        return true;
    }

    apply(location = window.location.href, backup = null) {

    }
}
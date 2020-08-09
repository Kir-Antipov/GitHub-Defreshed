/**
 * Base class for describing page transformation.
 */
export default class Fixer {

    /**
     * Indicates whether the transformation
     * is applicable to the specified location.
     * 
     * @param {string} location Page's URL. Can be either absolute or relative.
     * @param {HTMLElement} backup Container for passing elements removed from the DOM between fixers.
     * 
     * @returns {boolean} true if the transformation is applicable; otherwise, false.
     */
    isApplieble(location = window.location.href, backup = null) {
        return true;
    }

    /**
     * Awaits for the elements necessary for transformation to be loaded.
     * 
     * @param {string} location Page's URL. Can be either absolute or relative.
     * @param {HTMLElement} backup Container for passing elements removed from the DOM between fixers.
     * 
     * @returns {Promise<boolean>} true if everything is ready for transformation; otherwise, false.
     */
    waitUntilFixerReady(location = window.location.href, backup = null) {
        return true;
    }

    /**
     * Applies the transformation to the page.
     * 
     * This method runs only after waitUntilFixerReady
     * has successfully completed and returned true.
     * 
     * @param {string} location Page's URL. Can be either absolute or relative.
     * @param {HTMLElement} backup Container for passing elements removed from the DOM between fixers.
     */
    apply(location = window.location.href, backup = null) {

    }
}
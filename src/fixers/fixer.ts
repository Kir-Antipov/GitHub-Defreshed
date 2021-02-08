/**
 * Base class for describing page transformation.
 */
export default class Fixer {

    /**
     * Indicates whether the transformation
     * is applicable to the specified location.
     *
     * @param location Page's URL. Can be either absolute or relative.
     * @param backup Container for passing elements removed from the DOM between fixers.
     *
     * @returns true if the transformation is applicable; otherwise, false.
     */
    isApplieble(location = window.location.href, backup: HTMLElement = null): Promise<boolean> | boolean {
        return true;
    }

    /**
     * Awaits for the elements necessary for transformation to be loaded.
     *
     * @param location Page's URL. Can be either absolute or relative.
     * @param backup Container for passing elements removed from the DOM between fixers.
     *
     * @returns true if everything is ready for transformation; otherwise, false.
     */
    waitUntilFixerReady(location = window.location.href, backup: HTMLElement = null): Promise<boolean> | boolean {
        return true;
    }

    /**
     * Applies the transformation to the page.
     *
     * This method runs only after waitUntilFixerReady
     * has successfully completed and returned true.
     *
     * @param location Page's URL. Can be either absolute or relative.
     * @param backup Container for passing elements removed from the DOM between fixers.
     */
    apply(location = window.location.href, backup: HTMLElement = null): Promise<void> | void { }
}
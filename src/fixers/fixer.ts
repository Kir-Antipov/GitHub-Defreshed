/**
 * Base class for describing page transformation.
 */
export default interface Fixer {
    /**
     * Indicates whether the transformation
     * is applicable to the specified location.
     *
     * @param location Page's URL. Can be either absolute or relative.
     * @param backup Container for passing elements removed from the DOM between fixers.
     *
     * @returns true if the transformation is applicable; otherwise, false.
     */
    isApplieble(location: string, backup: HTMLElement): Promise<boolean> | boolean;

    /**
     * Awaits for the elements necessary for transformation to be loaded.
     *
     * @param location Page's URL. Can be either absolute or relative.
     * @param backup Container for passing elements removed from the DOM between fixers.
     *
     * @returns true if everything is ready for transformation; otherwise, false.
     */
    waitUntilFixerReady(location: string, backup: HTMLElement): Promise<boolean> | boolean;

    /**
     * Applies the transformation to the page.
     *
     * This method runs only after waitUntilFixerReady
     * has successfully completed and returned true.
     *
     * @param location Page's URL. Can be either absolute or relative.
     * @param backup Container for passing elements removed from the DOM between fixers.
     */
    apply(location: string, backup: HTMLElement): Promise<void> | void;
}

export default abstract class Fixer {
    isApplieble(_location: string, _backup: HTMLElement): Promise<boolean> | boolean {
        return true;
    }

    waitUntilFixerReady(_location: string, _backup: HTMLElement): Promise<boolean> | boolean {
        return true;
    }

    apply(_location: string, _backup: HTMLElement): Promise<void> | void { }
}
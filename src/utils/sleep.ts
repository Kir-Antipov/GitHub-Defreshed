/**
 * Sets a timer which resolves the promise once the timer expires.
 *
 * @param ms The delay, in milliseconds.
 */
export function sleep(ms: number) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

export default sleep;
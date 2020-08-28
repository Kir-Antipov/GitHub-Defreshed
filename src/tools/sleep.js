/**
 * Sets a timer which resolves the promise once the timer expires.
 * 
 * @param {number} ms The delay, in milliseconds.
 * 
 * @returns {Promise<void>} A promise representing the timer.
 */
export function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

export default sleep;
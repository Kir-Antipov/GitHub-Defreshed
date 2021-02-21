/**
 * Unifies asynchronous functions and functions that take a callback.
 */
export function convertToAsync<T>(func: Function, ...args: any[]) {
    return new Promise<T>((resolve, reject) => {
        try {
            const result = func(...args, resolve);
            if (result instanceof Promise) {
                result.then(resolve).catch(reject);
            } else if (result !== undefined) {
                resolve(result);
            }
        } catch (e) {
            reject(e);
        }
    });
}

/**
 * Unifies asynchronous functions and functions that take a callback.
 *
 * @param thisObject An object to which the this keyword can refer inside the new function.
 */
export function bindAndConvertToAsync<T>(thisObject: any, func: Function, ...args: any[]) {
    return convertToAsync<T>(func.bind(thisObject), ...args);
}
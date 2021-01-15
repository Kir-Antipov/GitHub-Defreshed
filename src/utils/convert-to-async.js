export function convertToAsync(func, ...args) {
    return new Promise((resolve, reject) => {
        try {
            let result = func(...args, resolve);
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

export function bindAndConvertToAsync(thisObject, func, ...args) {
    return convertToAsync(func.bind(thisObject), ...args);
}
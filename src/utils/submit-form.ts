/**
 * Submits the specified form and returns a server response.
 */
export function submitForm(form: HTMLFormElement, method: string = null) {
    method = method || form.method;

    return fetch(form.action, {
        method,
        body: new URLSearchParams(new FormData(form) as any),
    });
}

export default submitForm;
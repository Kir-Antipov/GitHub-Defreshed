/**
 * Submits the specified form and returns a server response.
 * 
 * @param {HTMLFormElement} form The form to be submitted.
 * @param {string} method Specifies how to send the form data to the server.
 * 
 * @returns {Promise<Response>} Server response.
 */
export function submitForm(form, method = null) {
    method = method || form.method;

    return fetch(form.action, {
        method: method,
        body: new URLSearchParams(new FormData(form)),
    });
}

export default submitForm;
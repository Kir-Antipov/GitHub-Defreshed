export default function submitForm(form, method) {
    method = method || form.method;

    return fetch(form.action, {
        method: method,
        body: new URLSearchParams(new FormData(form)),
    });
}
const APP_URL = "localhost:5000"

function callApi(endpoint, method, body) {
    console.log(endpoint, method, body)
    return fetch(
        "http://" + APP_URL + "" + endpoint,
        {
            method,
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            },
        })
}

export function postApi(endpoint, body) {
    return callApi(endpoint, "POST", body);
}

export function getApi(endpoint) {
    return callApi(endpoint, "GET");
}

export function putApi(endpoint, body) {
    return callApi(endpoint, "PUT", body);
}

export function deleteApi(endpoint) {
    return callApi(endpoint, "DELETE");
}
APP_URL = "localhost:5000"

function callApi(endpoint, method, body) {
    return fetch("http://" + APP_URL + "/api/v1/" + endpoint, { method: method, body: body })
}

function postApi(endpoint, body) {
    return callApi(endpoint, "POST", body);
}

function getApi(endpoint) {
    return callApi(endpoint, "GET");
}

function putApi(endpoint, body) {
    return callApi(endpoint, "PUT", body);
}

function deleteApi(endpoint) {
    return callApi(endpoint, "DELETE");
}
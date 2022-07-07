import * as userAuth from './userAuth.js';
function req(method, url, data) {
    let options = {
        method: method,
        headers: { 'content-type': 'application/json' }
    }

    const token = userAuth.getToken();

    if (token) {
        options.headers['X-Authorization'] = token;
    }

    if (method != 'GET') {
        options.body = JSON.stringify(data);
    }

    return fetch(url, options)
        .then(res => {
            if (res.status === 204) {
                return res;
            }
            return res.json();
        });
}

export const get = req.bind(null, 'GET');
export const post = req.bind(null, 'POST');
export const put = req.bind(null, 'PUT');
export const del = req.bind(null, 'DELETE');
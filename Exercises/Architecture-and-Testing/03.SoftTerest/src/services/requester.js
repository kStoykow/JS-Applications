import * as userAuth from '../services/userAuth.js';

function req(method, url, data) {
    let options = {
        method: method,
        headers: {
            'content-type': 'application/json',
        }
    }

    const token = userAuth.getToken();

    if (token) {
        options.headers['X-Authorization'] = token;
    }
    if (data) {
        options.body = JSON.stringify(data);
    }

    return fetch(url, options)
        .then(res => res.json())
        .then(res => {
            if (res.code == 409) {
                throw new Error(res.message);
            }

            return res;
        })
}

export const get = req.bind(null, 'get');
export const post = req.bind(null, 'post');
export const put = req.bind(null, 'put');
export const del = req.bind(null, 'delete');
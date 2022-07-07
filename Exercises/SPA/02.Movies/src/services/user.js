import * as request from '../services/requester.js';
import * as userAuth from './userAuth.js';

const baseUrl = 'http://localhost:3030';

const endpoints = {
    login: `${baseUrl}/users/login`,
    register: `${baseUrl}/users/register`,
    logout: `${baseUrl}/users/logout`,
}

export const login = (email, password) => request.post(endpoints.login, { email, password })
    .then(res => {
        if (res.code != 403) {
            userAuth.saveUser(res);
            return res;
        }
        throw new Error(res.message);
    })
    .catch(err => alert(err.message));

export const logout = () => request.get(endpoints.logout).then(() => localStorage.clear());

export const register = (email, password, repeat) => request.post(endpoints.register, { email, password, repeat })
    .then(res => {
        if (res.code == 409) {
            throw new Error(res.message);
        }
        return res;
    })
    .catch(err => alert(err.message))
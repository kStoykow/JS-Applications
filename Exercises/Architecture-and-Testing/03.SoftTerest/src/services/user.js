import * as request from '../services/requester.js';

const baseUrl = 'http://localhost:3030';

const endpoints = {
    register: `${baseUrl}/users/register`,
    login: `${baseUrl}/users/login`,
}

export const register = (email, password, repeatPassword) => request.post(endpoints.register, { email, password, repeatPassword });

export const login = (email, password) => request.post(endpoints.login, { email, password });
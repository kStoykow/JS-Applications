import * as request from '../services/requester.js';

const host = 'http://localhost:3030';

const endpoints = {
    register: `${host}/users/register`,
    login: `${host}/users/login`,
    logout: `${host}/users/logout`,
    createFurniture: `${host}/data/catalog`,
    getAll: `${host}/data/catalog`

}

export const register = (email, password, repeatPassword) => request.post(endpoints.register, { email, password, repeatPassword });

export const login = (email, password) => request.post(endpoints.login, { email, password });

export const logout = () => request.get(endpoints.logout);

export const createFurniture = (data) => request.post(endpoints.createFurniture, data);

export const getAll = () => request.get(endpoints.getAll);
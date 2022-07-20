import * as request from '../services/requester.js';

const host = 'http://localhost:3030';

const endpoints = {
    register: `${host}/users/register`,
    login: `${host}/users/login`,
    logout: `${host}/users/logout`,
    create: `${host}/data/teams`,
    getOne: (id) => `${host}/data/teams/${id}`,
    edit: (id) => `${host}/data/teams/${id}`,
}

export const register = (email, username, password, repass) => request.post(endpoints.register, { email, username, password, repeatPassword: repass });

export const login = (email, password) => request.post(endpoints.login, { email, password });

export const logout = () => request.get(endpoints.logout);

export const create = (data) => request.post(endpoints.create, data);

export const edit = (teamId, data) => request.put(endpoints.edit(teamId), data);

export const getOne = (teamId) => request.get(endpoints.getOne(teamId));
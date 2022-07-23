import * as request from '../services/requester.js';
import { getToken } from './userAuth.js';
const host = 'http://localhost:3030';

const endpoints = {
    register: `${host}/users/register`,
    login: `${host}/users/login`,
    logout: `${host}/users/logout`,
    create: `${host}/data/memes`,
    edit: (memeId) => `${host}/data/memes/${memeId}`,
    delete: (memeId) => `${host}/data/memes/${memeId}`,
    allMeme: `${host}/data/memes?sortBy=_createdOn%20desc`,
    getOne: (memeId) => `${host}/data/memes/${memeId}`,
    myMemes: (userId) => `${host}/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,

}

export const register = (username, email, password, gender) => request.post(endpoints.register, { username, email, password, gender });

export const login = (email, password) => request.post(endpoints.login, { email, password });

export const logout = () => fetch(endpoints.logout, { method: 'GET', headers: { 'X-Authorization': getToken() } });

export const allMeme = () => request.get(endpoints.allMeme);

export const create = (data) => request.post(endpoints.create, data);

export const edit = (memeId, data) => request.put(endpoints.edit(memeId), data);

export const del = (memeId) => request.del(endpoints.delete(memeId));

export const getOne = (memeId) => request.get(endpoints.getOne(memeId));

export const myMemes = (userId) => request.get(endpoints.myMemes(userId));
import * as request from '../services/requester.js';
import { getToken } from './userAuth.js';

const host = 'http://localhost:3030';

const endpoints = {
    register: `${host}/users/register`,
    login: `${host}/users/login`,
    logout: `${host}/users/logout`,
    create: `${host}/data/books`,
    edit: (bookId) => `${host}/data/books/${bookId}`,
    delete: (bookId) => `${host}/data/books/${bookId}`,
    allBooks: `${host}/data/books?sortBy=_createdOn%20desc`,
    getOne: (bookId) => `${host}/data/books/${bookId}`,
    myBooks: (userId) => `${host}/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,

}

export const register = (email, password, repeatPassword) => request.post(endpoints.register, { email, password, repeatPassword });

export const login = (email, password) => request.post(endpoints.login, { email, password });

export const logout = () => fetch(endpoints.logout, { method: 'GET', headers: { 'X-Authorization': getToken() } });

export const allBooks = () => request.get(endpoints.allBooks);

export const create = (title, description, imageUrl, type) => request.post(endpoints.create, { title, description, imageUrl, type });

export const edit = (bookId, title, description, imageUrl, type) => request.put(endpoints.edit(bookId), { title, description, imageUrl, type });

export const del = (bookId) => request.del(endpoints.delete(bookId));

export const getOne = (bookId) => request.get(endpoints.getOne(bookId));

export const myBooks = (userId) => request.get(endpoints.myBooks(userId));
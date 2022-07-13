import * as request from '../services/requester.js';

const baseUrl = 'http://localhost:3030';

const endpoints = {
    register: `${baseUrl}/users/register`,
    login: `${baseUrl}/users/login`,
    logout: `${baseUrl}/users/logout`,
    getIdeas: `${baseUrl}/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc`,
    getIdea: (ideaId) => `${baseUrl}/data/ideas/${ideaId}`,
    createIdea: `${baseUrl}/data/ideas`,
    deleteIdea: (ideaId) => `${baseUrl}/data/ideas/${ideaId}`,
}

export const register = (email, password, repeatPassword) => request.post(endpoints.register, { email, password, repeatPassword });

export const login = (email, password) => request.post(endpoints.login, { email, password });

export const logout = () => request.get(endpoints.logout);

export const getIdeas = () => request.get(endpoints.getIdeas);

export const getIdea = (ideaId) => request.get(endpoints.getIdea(ideaId));

export const createIdea = (title, description, img) => request.post(endpoints.createIdea, { title, description, img });

export const deleteIdea = (ideaId) => request.del(endpoints.deleteIdea(ideaId));
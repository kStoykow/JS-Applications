import * as request from '../services/requester.js';
import { getToken } from './userAuth.js';
const host = 'http://localhost:3030';

const endpoints = {
    register: `${host}/users/register`,
    login: `${host}/users/login`,
    logout: `${host}/users/logout`,
    create: `${host}/data/offers`,
    edit: (offerId) => `${host}/data/offers/${offerId}`,
    delete: (offerId) => `${host}/data/offers/${offerId}`,
    allJobs: `${host}/data/offers?sortBy=_createdOn%20desc`,
    getOne: (offerId) => `${host}/data/offers/${offerId}`,
    offerCount: (offerId) => `${host}/data/applications?where=offerId%3D%22${offerId}%22&distinct=_ownerId&count`,
    offers: (userId, offerId) => `${host}/data/applications?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
    apply: `${host}/data/applications`
}

export const register = (email, password) => request.post(endpoints.register, { email, password });

export const login = (email, password) => request.post(endpoints.login, { email, password });

export const logout = () => fetch(endpoints.logout, { method: 'GET', headers: { 'X-Authorization': getToken() } });

export const allOffers = () => request.get(endpoints.allJobs);

export const create = (data) => request.post(endpoints.create, data);

export const edit = (offerId, data) => request.put(endpoints.edit(offerId), data);

export const del = (offerId) => request.del(endpoints.delete(offerId));

export const getOne = (offerId) => request.get(endpoints.getOne(offerId));

export const offerCount = (offerId) => request.get(endpoints.offerCount(offerId));

export const myOfferCount = (userId, offerId) => request.get(endpoints.offers(userId, offerId));

export const apply = (offerId) => request.post(endpoints.apply, { offerId });
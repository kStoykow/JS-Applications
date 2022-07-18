import * as request from '../services/requester.js';

const host = 'http://localhost:3030';

const endpoints = {
    register: `${host}/users/register`,
    login: `${host}/users/login`,
    logout: `${host}/users/logout`,
    getOne: (productId) => `${host}/data/catalog/${productId}`,
    edit: (productId) => `${host}/data/catalog/${productId}`,
    delete: (productId) => `${host}/data/catalog/${productId}`,
    getAll: `${host}/data/catalog`,
    createProduct: `${host}/data/catalog`,
    ownProducts: (userId) => `${host}/data/catalog?where=_ownerId%3D%22${userId}%22`
}

export const register = (email, password, repeatPassword) => request.post(endpoints.register, { email, password, repeatPassword });

export const login = (email, password) => request.post(endpoints.login, { email, password });

export const logout = () => request.get(endpoints.logout);

export const createFurniture = (data) => request.post(endpoints.createProduct, data);

export const getAll = () => request.get(endpoints.getAll);

export const getOne = (productId) => request.get(endpoints.getOne(productId));

export const deleteProduct = (productId) => request.del(endpoints.delete(productId));

export const myProducts = (userId) => request.get(endpoints.ownProducts(userId));

export const edit = (productId, data) => request.put(endpoints.edit(productId), data);

export const validateProduct = () => {
    const makeElem = document.getElementById('new-make');
    const modelElem = document.getElementById('new-model');
    const yearElem = document.getElementById('new-year');
    const descriptionElem = document.getElementById('new-description');
    const priceElem = document.getElementById('new-price');
    const imgElem = document.getElementById('new-image');

    const form = document.querySelector('form');
    const { make, model, year, description, price, img, material } = Object.fromEntries(new FormData(form));
    if (make.length < 4) {
        makeElem.classList.add('is-invalid');
        makeElem.classList.remove('is-valid');
        return false;
    } else {
        makeElem.classList.add('is-valid');
        makeElem.classList.remove('is-invalid');
    }
    if (model.length < 4) {
        modelElem.classList.add('is-invalid');
        modelElem.classList.remove('is-valid');
        return false;
    } else {
        modelElem.classList.add('is-valid');
        modelElem.classList.remove('is-invalid');
    }
    if (Number(year) < 1950 || Number(year) > 2050) {
        yearElem.classList.add('is-invalid');
        yearElem.classList.remove('is-valid');
        return false;
    } else {
        yearElem.classList.add('is-valid');
        yearElem.classList.remove('is-invalid');
    }
    if (description.length < 11) {
        descriptionElem.classList.add('is-invalid');
        descriptionElem.classList.remove('is-valid');
        return false;
    } else {
        descriptionElem.classList.add('is-valid');
        descriptionElem.classList.remove('is-invalid');
    }
    if (Number(price) < 0) {
        priceElem.classList.add('is-invalid');
        priceElem.classList.remove('is-valid');
        return false;
    } else {
        priceElem.classList.add('is-valid');
        priceElem.classList.remove('is-invalid');
    }
    if (img.length == 0) {
        imgElem.classList.add('is-invalid');
        imgElem.classList.remove('is-valid');
        return false;
    } else {
        imgElem.classList.add('is-valid');
        imgElem.classList.remove('is-invalid');
    }
    return true;
}
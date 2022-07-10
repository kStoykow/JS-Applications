import * as request from '../services/requester.js';
import * as userAuth from './userAuth.js';

const baseUrl = 'http://localhost:3030';

const endpoints = {
    login: `${baseUrl}/users/login`,
    register: `${baseUrl}/users/register`,
    logout: `${baseUrl}/users/logout`,
    addMovie: `${baseUrl}/data/movies`,
    getMovies: `${baseUrl}/data/movies`,
    getMovie: (id) => `${baseUrl}/data/movies/${id}`,
    editMovie: (id) => `${baseUrl}/data/movies/${id}`,
    getLikes: (id) => `${baseUrl}/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`,
    isLiked: (id, userId) => `${baseUrl}/data/likes?where=movieId%3D%22${id}%22%20and%20_ownerId%3D%22${userId}%22`,
    like: `${baseUrl}/data/likes`,
    delete: (id) => `${baseUrl}/data/movies/${id}`,
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
    .catch(err => alert(err.message));

export const addMovie = (title, description, img) => request.post(endpoints.addMovie, { title, description, img });

export const getMovies = () => request.get(endpoints.getMovies);

export const getMovie = (id) => request.get(endpoints.getMovie(id));

export const editMovie = (id, title, description, img) => request.put(endpoints.editMovie(id), { title, description, img });

export const getLikes = (id) => request.get(endpoints.getLikes(id));

export const isLiked = (movieId, userId) => request.get(endpoints.isLiked(movieId, userId));

export const like = (movieId) => request.post(endpoints.like, { movieId });

export const deleteMovie = (id) => request.del(endpoints.delete(id));
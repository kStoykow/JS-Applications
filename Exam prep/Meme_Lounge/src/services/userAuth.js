export const getUser = () => JSON.parse(localStorage.getItem('user'));

export const getToken = () => getUser()?.accessToken;

export const saveUser = (user) => localStorage.setItem('user', JSON.stringify(user));
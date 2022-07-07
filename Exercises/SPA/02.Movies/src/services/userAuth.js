export const getUser = () => JSON.parse(localStorage.getItem('user'));

export const getToken = () => {
    const user = getUser();
    if (user) {
        return user.accessToken;
    }
}

export const saveUser = (user) => localStorage.setItem('user', JSON.stringify(user));
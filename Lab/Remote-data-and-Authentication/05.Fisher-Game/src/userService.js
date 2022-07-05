export const getUser = () => {
    return JSON.parse(localStorage.getItem('user'));
}

export const getToken = () => {
    const user = getUser();
    return user.accessToken;
}

const home = document.getElementById('home');

const baseUrl = 'http://localhost:3030';
const endpoints = {
    logout: `${baseUrl}/users/logout`,
}
export const logout = () => {
    const token = getToken();

    fetch(endpoints.logout, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        }
    })
        .then(res => {
            if (res.ok) {
                localStorage.clear();
                location.href = home.href;
            } else {
                throw new Error(res.message);
            }
        })
        .catch(err => alert(err.message));
}
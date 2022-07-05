const loginForm = document.querySelector('form');

const loginUrl = 'http://localhost:3030/users/login';
const home = document.getElementById('home');
const login = (e) => {
    e.preventDefault();
    const { email, password } = Object.fromEntries(new FormData(e.currentTarget));

    fetch(loginUrl, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
        .then(res => res.json())
        .then(res => {
            if (res.code != 403) {
                localStorage.setItem('user', JSON.stringify(res));
                location.href = home.href;
            } else {
                throw new Error(`${res.message}`);
            }
        })
        .catch(err => alert(err.message));
}
loginForm.addEventListener('submit', login);
import * as userService from './userService.js';

const nav = {
    user: document.getElementById('user'),
    guest: document.getElementById('guest'),
}
const buttons = {
    update: Array.from(document.querySelectorAll('button.update')),
    delete: Array.from(document.querySelectorAll('button.delete')),
    add: document.querySelector('button.add'),
    logout: document.getElementById('logout'),
}
const welcomeElem = document.querySelector('.email span');

const user = userService.getUser();
if (user) {
    nav.user.style.display = 'inline-block';
    nav.guest.style.display = 'none';
    welcomeElem.textContent = user.email;
} else {
    nav.user.style.display = 'none';
    nav.guest.style.display = 'inline-block';
    welcomeElem.textContent = 'guest';
    buttons.update.map(e => e.disabled = true);
    buttons.delete.map(e => e.disabled = true);
    buttons.add.disabled = true;
}

logout.addEventListener('click', userService.logout);
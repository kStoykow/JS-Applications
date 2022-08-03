import * as userService from '../services/user.js';

export const logoutView = (ctx) => userService.logout()
    .then(() => {
        localStorage.clear();
        ctx.page.redirect('/');
    });
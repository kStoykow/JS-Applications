import * as userService from '../services/user.js';

export const logoutView = (ctx) => {
    localStorage.clear();

    userService.logout().then(() => ctx.page.redirect('/'));
}

// export const logoutView = (ctx) => userService.logout()
//     .then(() => {
//         localStorage.clear();
//         ctx.page.redirect('/');
//     });
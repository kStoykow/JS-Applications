import { html } from "../../node_modules/lit-html/lit-html.js";
import * as userService from '../services/user.js';

export const logoutView = (ctx) => userService.logout().then(() => ctx.page.redirect('/'));   
import { render } from '../../node_modules/lit-html/lit-html.js';
import * as userAuth from '../services/userAuth.js';

const root = document.getElementById('container');
const renderer = (template) => render(template, root);

export const ctxRender = (ctx, next) => {
    ctx.render = renderer;
    ctx.user = userAuth.getUser();;

    next();
}
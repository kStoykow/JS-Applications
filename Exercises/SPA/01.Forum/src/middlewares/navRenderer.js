import { render } from '../../node_modules/lit-html/lit-html.js';
import { navView } from '../views/nav.js';

const nav = document.querySelector('header');
const root = document.querySelector('.container');

const ctxRenderer = (template) => {
    return render(template, root);
}

export const navRenderer = (ctx, next) => {
    ctx.render = ctxRenderer;
    render(navView(), nav);
    next();
}
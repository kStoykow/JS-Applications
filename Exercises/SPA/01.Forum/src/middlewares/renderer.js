import { render } from '../../node_modules/lit-html/lit-html.js';

const root = document.querySelector('.container');

const ctxRenderer = (template) => {
    return render(template, root);
}

export const renderer = (ctx, next) => {
    ctx.render = ctxRenderer;
    
    next();
}
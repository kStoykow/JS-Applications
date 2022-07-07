import { render } from '../../node_modules/lit-html/lit-html.js';
import { footerView } from '../views/footer.js';

const footerElem = document.querySelector('.page-footer');

export const footerRenderer = (ctx, next) => {
    render(footerView, footerElem);

    next();
}
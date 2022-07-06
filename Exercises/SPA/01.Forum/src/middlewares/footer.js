import { render } from '../../node_modules/lit-html/lit-html.js';
import { footerView } from '../views/footer.js';

const footer= document.querySelector('footer');

export const footerRender = (ctx, next) => {
    render(footerView(), footer);
    next();
}
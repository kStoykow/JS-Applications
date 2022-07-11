import { html, render } from "../../node_modules/lit-html/lit-html.js";

const footerElem = document.querySelector('.footer');

const footerTemplate = html`
<div class="container-footer">
    <span>© We cherish your ideas! Share them with others!</span>
</div>
`;

export const footerMiddleware = (ctx, next) => {
    render(footerTemplate, footerElem);

    next();
}
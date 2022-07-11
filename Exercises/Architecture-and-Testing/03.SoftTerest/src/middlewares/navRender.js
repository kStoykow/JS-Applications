import { render } from "../../node_modules/lit-html/lit-html.js";
import { navView } from "../views/nav.js";

const navElem = document.querySelector('.navbar');

export const navigationMiddleware = (ctx, next) => {
    render(navView(ctx), navElem);

    next();
}
import { render } from "../../node_modules/lit-html/lit-html.js";
import * as userAuth from "../services/userAuth.js";

const root = document.querySelector('.root');

function renderer(template) {
    return render(template, root);
};

export const renderMiddleware = (ctx, next) => {
    ctx.render = renderer;
    ctx.user = userAuth.getUser();

    next();
}
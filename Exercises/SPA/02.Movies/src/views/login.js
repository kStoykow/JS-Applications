import { html } from "../../node_modules/lit-html/lit-html.js";

import * as userService from '../services/user.js';

const loginTemplate = (ctx) => html`
<section id="form-login" class="view-section">
    <form id="login-form" class="text-center border border-light p-5" @submit=${loginHandler.bind(null, ctx)}>
        <div class="form-group">
            <label for="email">Email</label>
            <input id="email" type="email" class="form-control" placeholder="Email" name="email" value="" />
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input id="password" type="password" class="form-control" placeholder="Password" name="password" value="" />
        </div>

        <button type="submit" class="btn btn-primary">Login</button>
    </form>
</section>
`;

const loginHandler = (ctx, e) => {
    e.preventDefault();

    const { email, password } = Object.fromEntries(new FormData(e.currentTarget));

    userService.login(email, password)
        .then(res => {
            if (res) {
                ctx.page.redirect('/');
            }
        });
}

export const loginView = (ctx) => ctx.render(loginTemplate(ctx));
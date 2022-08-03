import { html } from '../../node_modules/lit-html/lit-html.js';
import * as userService from '../services/user.js';
import * as userAuth from '../services/userAuth.js';

const loginTemplate = (ctx) => html`
        <section id="login-page" class="login">
            <form id="login-form" action="" method="" @submit=${loginHandler.bind(null, ctx)}>
                <fieldset>
                    <legend>Login Form</legend>
                    <p class="field">
                        <label for="email">Email</label>
                        <span class="input">
                            <input type="text" name="email" id="email" placeholder="Email">
                        </span>
                    </p>
                    <p class="field">
                        <label for="password">Password</label>
                        <span class="input">
                            <input type="password" name="password" id="password" placeholder="Password">
                        </span>
                    </p>
                    <input class="button submit" type="submit" value="Login">
                </fieldset>
            </form>
        </section>
`;

const loginHandler = (ctx, e) => {
    e.preventDefault();

    const { email, password } = Object.fromEntries(new FormData(e.target));


    userService.login(email, password)
        .then(res => {
            if (res.code == 403) {
                throw new Error(res.message);
            }

            userAuth.saveUser(res);
            ctx.page.redirect('/');
        })
        .catch(err => alert(err.message));
}

export const loginView = (ctx) => ctx.render(loginTemplate(ctx));
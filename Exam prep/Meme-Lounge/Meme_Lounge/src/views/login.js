import { html } from '../../node_modules/lit-html/lit-html.js';
import * as userService from '../services/user.js';
import * as userAuth from '../services/userAuth.js';

const loginTemplate = (ctx) => html`
<section id="login">
    <form id="login-form" @submit=${loginHandler.bind(null, ctx)}>
        <div class="container">
            <h1>Login</h1>
            <label for="email">Email</label>
            <input id="email" placeholder="Enter Email" name="email" type="text">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <input type="submit" class="registerbtn button" value="Login">
            <div class="container signin">
                <p>Dont have an account?<a href="/register">Sign up</a>.</p>
            </div>
        </div>
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
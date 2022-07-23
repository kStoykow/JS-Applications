import { html } from '../../node_modules/lit-html/lit-html.js';
import * as userService from '../services/user.js';
import * as userAuth from '../services/userAuth.js';

const loginTemplate = (ctx) => html`
<section id="login">
    <article class="narrow">
        <header class="pad-med">
            <h1>Login</h1>
        </header>
        <form id="login-form" class="main-form pad-large" @submit=${loginHandler.bind(null, ctx)}>
            <div class="error" style="display:none">Error message.</div>
            <label>E-mail: <input type="text" name="email"></label>
            <label>Password: <input type="password" name="password"></label>
            <input class="action cta" type="submit" value="Sign In">
        </form>
        <footer class="pad-small">Don't have an account? <a href="/register" class="invert">Sign up here</a>
        </footer>
    </article>
</section>
`;

const loginHandler = (ctx, e) => {
    e.preventDefault();
    const error = document.querySelector('.error');

    const { email, password } = Object.fromEntries(new FormData(e.target));


    userService.login(email, password)
        .then(res => {
            if (res.code == 403) {
                error.textContent= res.message;
                error.style.display='block';
                return;
            }

            userAuth.saveUser(res);
            ctx.page.redirect('/');
        })
}

export const loginView = (ctx) => ctx.render(loginTemplate(ctx));
import { html } from '../../node_modules/lit-html/lit-html.js';
import * as userService from '../services/user.js';
import * as userAuth from '../services/userAuth.js';

const loginTemplate = (ctx) => html`
<section id="login">
    <div class="form">
        <h2>Login</h2>
        <form class="login-form" @submit=${loginHandler.bind(null, ctx)}>
            <input type="text" name="email" id="email" placeholder="email" />
            <input type="password" name="password" id="password" placeholder="password" />
            <button type="submit">login</button>
            <p class="message">
                Not registered? <a href="/register">Create an account</a>
            </p>
        </form>
    </div>
</section>
`;

const loginHandler = (ctx, e) => {
    e.preventDefault();

    const { email, password } = Object.fromEntries(new FormData(e.target));

    if (email == '' || password == '') {
        return alert('All fields must be filled.');
    }

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
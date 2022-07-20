import { html } from '../../node_modules/lit-html/lit-html.js';
import * as userService from '../services/user.js';
import * as userAuth from '../services/userAuth.js';

const registerTemplate = (ctx) => html`
<section id="register">
    <article class="narrow">
        <header class="pad-med">
            <h1>Register</h1>
        </header>
        <form id="register-form" class="main-form pad-large" @submit=${registerHandler.bind(null, ctx)}>
            <div class="error">Error message.</div>
            <label>E-mail: <input type="text" name="email"></label>
            <label>Username: <input type="text" name="username"></label>
            <label>Password: <input type="password" name="password"></label>
            <label>Repeat: <input type="password" name="repass"></label>
            <input class="action cta" type="submit" value="Create Account">
        </form>
        <footer class="pad-small">Already have an account? <a href="#" class="invert">Sign in here</a>
        </footer>
    </article>
</section>
`;

const registerHandler = (ctx, e) => {
    e.preventDefault();

    const { email, username, password, repass } = Object.fromEntries(new FormData(e.target));


    userService.register(email, username, password, repass)
        .then(res => {
            const data = email.split('@')[0];
            const username = data[0].toLocaleUpperCase() + data.slice(1);

            const user = { username: username, email: res.email, _id: res._id, accessToken: res.accessToken };

            userAuth.saveUser(user);
            ctx.page.redirect('/');
        })
        .catch(err => alert(err.message));
}

export const registerView = (ctx) => ctx.render(registerTemplate(ctx));
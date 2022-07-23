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
            <div class="error" style="display:none">Error message.</div>
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
    const error = document.querySelector('.error');

    const { email, username, password, repass } = Object.fromEntries(new FormData(e.target));

    if (email == '') {
        error.textContent = 'Email must be real.';
        error.style.display = 'block';
        return;
    }

    if (username.length < 3) {
        error.textContent = 'Username must be atleast 3 characters long.';
        error.style.display = 'block';
        return;
    }
    if (password.length < 3) {
        error.textContent = 'Password must be atleast 3 characters/digits long.';
        error.style.display = 'block';
        return;
    }
    if (password != repass) {
        error.textContent = 'Passwords must be equal.';
        error.style.display = 'block';
        return;
    }

    userService.register(email, username, password, repass)
        .then(res => {
            if (res.code == 409) {
                error.textContent = `${res.message}`;
                error.style.display = 'block';

            } else {
                error.style.display = 'none';
                const user = { username: res.username, email: res.email, _id: res._id, accessToken: res.accessToken };

                userAuth.saveUser(user);
                ctx.page.redirect('/');
            }
        })
        .catch(err => alert(err.message));
}

export const registerView = (ctx) => ctx.render(registerTemplate(ctx));
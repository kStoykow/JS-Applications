import { html } from "../../node_modules/lit-html/lit-html.js";

import * as userService from '../services/user.js';
import * as  userAuth from "../services/userAuth.js";

const registerTemplate = (ctx) => html`
<section id="form-sign-up" class="view-section">
    <form id="register-form" class="text-center border border-light p-5" @submit=${registerHandler.bind(null, ctx)}>
        <div class="form-group">
            <label for="email">Email</label>
            <input id="email" type="email" class="form-control" placeholder="Email" name="email" value="" />
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input id="password" type="password" class="form-control" placeholder="Password" name="password" value="" />
        </div>

        <div class="form-group">
            <label for="repeatPassword">Repeat Password</label>
            <input id="repeatPassword" type="password" class="form-control" placeholder="Repeat-Password"
                name="repeatPassword" value="" />
        </div>

        <button type="submit" class="btn btn-primary">Register</button>
    </form>
</section>
`;

const registerHandler = (ctx, e) => {
    e.preventDefault();
    const { email, password, repeatPassword } = Object.fromEntries(new FormData(e.currentTarget));

    if (email == '' && password == '' && repeatPassword == '') {
        alert('All fields must be filled.');

    } else if (password.length < 6) {
        alert('Password must be atleast 6 characters.');

    } else if (password != repeatPassword) {
        alert('Passwords don\'t match.');

    } else {
        userService.register(email, password, repeatPassword)
            .then(res => {
                let username = res.email.split('@')[0];
                username = username[0].toLocaleUpperCase() + username.slice(1);

                const user = { username: username, _id: res._id, email: res.email, accessToken: res.accessToken };
                userAuth.saveUser(user);
            })
            .then(() => ctx.page.redirect('/'));
    }
}

export const registerView = (ctx) => ctx.render(registerTemplate(ctx));
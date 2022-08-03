import { html, reparentNodes } from '../../node_modules/lit-html/lit-html.js';
import * as userService from '../services/user.js';
import * as userAuth from '../services/userAuth.js';

const registerTemplate = (ctx) => html`
<section id="register-page" class="register">
    <form id="register-form" action="" method="" @submit=${registerHandler.bind(null, ctx)}>
        <fieldset>
            <legend>Register Form</legend>
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
            <p class="field">
                <label for="repeat-pass">Repeat Password</label>
                <span class="input">
                    <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
                </span>
            </p>
            <input class="button submit" type="submit" value="Register">
        </fieldset>
    </form>
</section>
`;

const registerHandler = (ctx, e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    
    const email = data.get('email');
    const password = data.get('password');
    const repeatPassword = data.get('confirm-pass');


    if (email == '' || password == '' || repeatPassword == '') {
        return alert('All fields must be filled.');
    }

    if (password != repeatPassword) {
        return alert('Passwords must match.');
    }

    userService.register(email, password, repeatPassword)
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
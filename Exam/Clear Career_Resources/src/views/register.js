import { html, reparentNodes } from '../../node_modules/lit-html/lit-html.js';
import * as userService from '../services/user.js';
import * as userAuth from '../services/userAuth.js';

const registerTemplate = (ctx) => html`
<section id="register">
    <div class="form">
        <h2>Register</h2>
        <form class="login-form" @submit=${registerHandler.bind(null, ctx)}>
            <input type="text" name="email" id="register-email" placeholder="email" />
            <input type="password" name="password" id="register-password" placeholder="password" />
            <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
            <button type="submit">register</button>
            <p class="message">Already registered? <a href="#">Login</a></p>
        </form>
    </div>
</section>
`;

const registerHandler = (ctx, e) => {
    e.preventDefault();

    const data = new FormData(e.target);

    const email = data.get('email');
    const password = data.get('password');
    const repeatPassword = data.get('re-password');


    if (email == '' || password == '' || repeatPassword == '') {
        return alert('All fields must be filled.');
    }

    if (password != repeatPassword) {
        return alert('Passwords must match.');
    }

    userService.register(email, password)
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
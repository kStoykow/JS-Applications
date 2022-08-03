import { html } from '../../node_modules/lit-html/lit-html.js';
import * as userService from '../services/user.js';
import * as userAuth from '../services/userAuth.js';

const registerTemplate = (ctx) => html`
<section id="register">
    <form id="register-form" @submit=${registerHandler.bind(null, ctx)}>
        <div class="container">
            <h1>Register</h1>
            <label for="username">Username</label>
            <input id="username" type="text" placeholder="Enter Username" name="username">
            <label for="email">Email</label>
            <input id="email" type="text" placeholder="Enter Email" name="email">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <label for="repeatPass">Repeat Password</label>
            <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
            <div class="gender">
                <input type="radio" name="gender" id="female" value="female">
                <label for="female">Female</label>
                <input type="radio" name="gender" id="male" value="male" checked>
                <label for="male">Male</label>
            </div>
            <input type="submit" class="registerbtn button" value="Register">
            <div class="container signin">
                <p>Already have an account?<a href="/login">Sign in</a>.</p>
            </div>
        </div>
    </form>
</section>
`;

const registerHandler = (ctx, e) => {
    e.preventDefault();

    const { username, email, password, repeatPass, gender } = Object.fromEntries(new FormData(e.target));

    if (username == '' || email == '' || password == '' || repeatPass == '' || gender == '') {
        return alert('All fields must be filled.');
    }

    if (password != repeatPass) {
        return alert('Passwords must match!');
    }

    userService.register(username, email, password, gender)
        .then(res => {

            const user = { username: username, gender: gender, email: res.email, _id: res._id, accessToken: res.accessToken };

            userAuth.saveUser(user);
            ctx.page.redirect('/meme');
        })
        .catch(err => alert(err.message));
}

export const registerView = (ctx) => ctx.render(registerTemplate(ctx));
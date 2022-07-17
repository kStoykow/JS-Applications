import { html } from '../../node_modules/lit-html/lit-html.js';
import * as userService from '../services/user.js';
import * as userAuth from '../services/userAuth.js';

const registerTemplate = (ctx) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Register New User</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${registerHandler.bind(null, ctx)}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="email">Email</label>
                <input class="form-control" id="email" type="text" name="email">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="password">Password</label>
                <input class="form-control" id="password" type="password" name="password">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="rePass">Repeat</label>
                <input class="form-control" id="rePass" type="password" name="rePass">
            </div>
            <input type="submit" class="btn btn-primary" value="Register" />
        </div>
    </div>
</form>
`;

const registerHandler = (ctx, e) => {
    e.preventDefault();

    const { email, password, rePass } = Object.fromEntries(new FormData(e.target));

    userService.register(email, password, rePass)
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
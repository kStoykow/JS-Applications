import { html } from '../../node_modules/lit-html/lit-html.js';
import * as userService from '../services/user.js';
import * as userAuth from '../services/userAuth.js';

const loginTemplate = (ctx) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Login User</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${loginHandler.bind(null, ctx)}>
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
            <input type="submit" class="btn btn-primary" value="Login" />
        </div>
    </div>
</form>
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
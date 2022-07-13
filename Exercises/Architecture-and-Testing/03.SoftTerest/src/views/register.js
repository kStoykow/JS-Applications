import { html } from '../../node_modules/lit-html/lit-html.js';
import * as userService from '../services/user.js';
import * as userAuth from '../services/userAuth.js';

const registerTemplate = (ctx) => html`
    <div class="container home wrapper  my-md-5 pl-md-5">
        <div class="row-form d-md-flex flex-mb-equal ">
            <div class="col-md-4">
                <img class="responsive" src="./images/idea.png" alt="">
            </div>
            <form class="form-user col-md-7" action="" method="" @submit=${registerHandler.bind(null, ctx)}>
                <div class="text-center mb-4">
                    <h1 class="h3 mb-3 font-weight-normal">Register</h1>
                </div>
                <div class="form-label-group">
                    <label for="email">Email</label>
                    <input type="text" id="email" name="email" class="form-control" placeholder="Email" required=""
                        autofocus="">
                </div>
                <div class="form-label-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" class="form-control" placeholder="Password"
                        required="">
                </div>
                <div class="form-label-group">
                    <label for="inputRepeatPassword">Repeat Password</label>
                    <input type="password" id="inputRepeatPassword" name="repeatPassword" class="form-control"
                        placeholder="Repeat Password" required="">
                </div>
                <button class="btn btn-lg btn-dark btn-block" type="submit">Sign Up</button>
                <div class="text-center mb-4">
                    <p class="alreadyUser"> Already have account? Then just
                        <a href="/login">Sign-In</a>!
                    </p>
                </div>
                <p class="mt-5 mb-3 text-muted text-center">© SoftTerest - 2019.</p>
            </form>
        </div>
    </div>
`;

const registerHandler = (ctx, e) => {
    e.preventDefault();

    const { email, password, repeatPassword } = Object.fromEntries(new FormData(e.target));

    if (email == '' || password == '' || repeatPassword == '') {
        alert('All fields must be filled.');
    } else if (email.length < 3 || password.length < 3) {
        alert('Email and password must be atleast 3 characters long.');
    } else if (password != repeatPassword) {
        alert('Password dont match.');
    } else {
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
}

export const registerView = (ctx) => ctx.render(registerTemplate(ctx));
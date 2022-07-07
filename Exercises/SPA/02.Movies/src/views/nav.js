import { html } from "../../node_modules/lit-html/lit-html.js";

const navTemplate = (ctx) => html`
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand text-light" href="/">Movies</a>
    <ul class="navbar-nav ml-auto">

        ${ctx.user
        ? html`<li class="nav-item user">
            <a class="nav-link" id="welcome-msg">Welcome, ${ctx.user.email}</a>
        </li>
        <li class="nav-item user">
            <a class="nav-link" href="/logout">Logout</a>
        </li>`
        : html`<li class="nav-item guest">
            <a class="nav-link" href="/login">Login</a>
        </li>
        <li class="nav-item guest">
            <a class="nav-link" href="/register">Register</a>
        </li>`
        }

    </ul>
</nav>`;

export const navView = (ctx) => navTemplate(ctx); 
import { html } from '../../node_modules/lit-html/lit-html.js';

const user = html`
<li class="nav-item active">
    <a class="nav-link" href="/create">Create</a>
</li>
<li class="nav-item">
    <a class="nav-link" href="/logout">Logout</a>
</li>
`;

const guest = html` 
<li class="nav-item">
    <a class="nav-link" href="/login">Login</a>
</li>
<li class="nav-item">
    <a class="nav-link" href="/register">Register</a>
</li>
`;

const navTemplate = (ctx) => html`
<div class="container">
    <a class="navbar-brand" href="/">
        <img src="../../images/idea.png" alt="">
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
        aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
                <a class="nav-link" href="/dashboard">Dashboard</a>
            </li>
            ${ctx.user 
                ? user 
                : guest}
        </ul>
    </div>
</div>
`;

export const navView = (ctx) => navTemplate(ctx);
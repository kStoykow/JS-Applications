import { html } from '../../node_modules/lit-html/lit-html.js';

const user = html`
<div id="user">
    <a id="createLink" href="/create">Create Furniture</a>
    <a id="profileLink" href="/profile">My Publications</a>
    <a id="logoutBtn" href="/logout">Logout</a>
</div>
`;

const guest = html` 
<div id="guest">
    <a id="loginLink" href="/login">Login</a>
    <a id="registerLink" href="/register">Register</a>
</div>
`;

const navTemplate = (ctx) => html`
<h1><a href="/">Furniture Store</a></h1>
<nav>
    <a id="catalogLink" href="/" class="active">Dashboard</a>
    ${ctx.user
    ? user
    : guest}
</nav>
`;

export const navView = (ctx) => navTemplate(ctx);
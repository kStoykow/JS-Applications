import { html } from '../../node_modules/lit-html/lit-html.js';

const user = (ctx) => html`
<div class="user">
    <a href="/create">Create Meme</a>
    <div class="profile">
        <span>Welcome, ${ctx.user.email}</span>
        <a href="/profile">My Profile</a>
        <a href="/logout">Logout</a>
    </div>
</div>
`;

const guest = html`
<div class="guest">
    <div class="profile">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
    </div>
    <a class="active" href="/">Home Page</a>
</div>
`;

const navTemplate = (ctx) => html`
<a href="/meme">All Memes</a>
        ${ctx.user 
                ? user(ctx) 
                : guest} 
`;

export const navView = (ctx) => navTemplate(ctx);
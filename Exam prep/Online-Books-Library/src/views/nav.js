import { html } from '../../node_modules/lit-html/lit-html.js';

const user =(ctx) => html`
<div id="user">
        <span>Welcome, ${ctx.user.email}</span>
        <a class="button" href="/profile">My Books</a>
        <a class="button" href="/create">Add Book</a>
        <a class="button" href="/logout">Logout</a>
    </div>
`;

const guest = html` 
<div id="guest">
        <a class="button" href="/login">Login</a>
        <a class="button" href="/register">Register</a>
</div>
`;

const navTemplate = (ctx) => html`
 <nav class="navbar">
        <section class="navbar-dashboard">
            <a href="/">Dashboard</a>
            ${ctx.user 
        ? user(ctx) 
        : guest}
       </section>
    </nav>              
`;

export const navView = (ctx) => navTemplate(ctx);
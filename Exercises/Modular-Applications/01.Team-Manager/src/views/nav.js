import { html } from '../../node_modules/lit-html/lit-html.js';

const user = html`
<a href="/teams" class="action">My Teams</a>
<a href="/logout" class="action">Logout</a>
`;

const guest = html` 
<a href="/login" class="action">Login</a>
<a href="/register" class="action">Register</a>
`;

const navTemplate = (ctx) => html`
<a href="/" class="site-logo">Team Manager</a>
<nav>
    <a href="/browse" class="action">Browse Teams</a>
    ${ctx.user
        ? user
        : guest
        }
</nav>
`;

export const navView = (ctx) => navTemplate(ctx);
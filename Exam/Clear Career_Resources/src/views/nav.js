import { html } from '../../node_modules/lit-html/lit-html.js';

const user = html`
<div class="user">
            <a href="/create">Create Offer</a>
            <a href="/logout">Logout</a>
</div>
`;

const guest = html` 
<div class="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
</div>
`;

const navTemplate = (ctx) => html`
 <a id="logo" href="/"><img id="logo-img" src="./images/logo.jpg" alt=""/></a>
<nav>
          <div>
            <a href="/">Dashboard</a>
          </div>

          ${ctx.user 
                ? user 
                : guest}
                
</nav>
`;

export const navView = (ctx) => navTemplate(ctx);
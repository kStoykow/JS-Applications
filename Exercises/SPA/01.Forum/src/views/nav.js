import { html } from '../../node_modules/lit-html/lit-html.js';

const navTemplate = html`
<div class="mini-navbar-wrap">
    <div class="logo-wrap">
        <p class="logo"><span class="logo">SoftUni Forum</span></p>
    </div>
    <div class="mini-navbar">

    </div>
</div>
<nav>
    <ul>
        <li>
            <a href="/">Home</a>
        </li>
    </ul>
</nav>`;

export const navView = (ctx) => navTemplate;
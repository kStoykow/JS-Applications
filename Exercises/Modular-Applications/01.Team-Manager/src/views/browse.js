import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as  userService from '../services/user.js';

const browseTemplate = (ctx, teamId) => html`
<section id="browse">

    <article class="pad-med">
        <h1>Team Browser</h1>
    </article>

    ${ctx.user 
        ? html`<article class="layout narrow">
        <div class="pad-small"><a href="/create" class="action cta">Create Team</a></div>
    </article>` 
        : nothing}

    <article class="layout">
        <img src="./assets/hydrant.png" class="team-logo left-col">
        <div class="tm-preview">
            <h2>Minions</h2>
            <p>Friendly neighbourhood jelly beans, helping evil-doers succeed.</p>
            <span class="details">150 Members</span>
            <div><a href="/details/${teamId}" class="action">See details</a></div>
        </div>
    </article>

</section>`;


export const browseView = (ctx) => {
    const teamId = 1;

    ctx.render(browseTemplate(ctx, teamId))
};
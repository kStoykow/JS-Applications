import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as  userService from '../services/user.js';

const teamTemplate= (team, members)=>html`
<article class="layout">
    <img src="${team.logoUrl}" class="team-logo left-col">
    <div class="tm-preview">
        <h2>${team.name}</h2>
        <p>${team.description}</p>
        <span class="details">${members.length} Members</span>
        <div><a href="/details/${team._id}" class="action">See details</a></div>
    </div>
</article>`;

const browseTemplate = (ctx, teams, members) => html`
<section id="browse">

    <article class="pad-med">
        <h1>Team Browser</h1>
    </article>

    ${ctx.user 
        ? html`<article class="layout narrow">
        <div class="pad-small"><a href="/create" class="action cta">Create Team</a></div>
    </article>` 
        : nothing}
    ${teams.map(t=> teamTemplate(t, members.filter(e=> e.teamId==t._id)))}
</section>`;


export const browseView = (ctx) => Promise.all([
        userService.getAll(),
        userService.getAllMembers()
    ])
    .then(([teams, members])=> ctx.render(browseTemplate(ctx, teams, members)));
import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as  userService from '../services/user.js';

const team = (team) => html`
<article class="layout">
    <img src="${team.team.logoUrl}" class="team-logo left-col">
    <div class="tm-preview">
        <h2>${team.team.name}</h2>
        <p>${team.team.description}</p>
        <span class="details">3 Members</span>
        <div><a href="/details/${team.team._id}" class="action">See details</a></div>
    </div>
</article>`;

const teamsTemplate = (ctx, teams) => html`
<section id="my-teams">

    <article class="pad-med">
        <h1>My Teams</h1>
    </article>
    ${teams.length > 0
        ? teams.map(team)
        : html`
    <article class="layout narrow">
        <div class="pad-med">
            <p>You are not a member of any team yet.</p>
            <p><a href="#">Browse all teams</a> to join one, or use the button bellow to cerate your own
                team.</p>
        </div>
        <div class=""><a href="/create" class="action cta">Create Team</a></div>
    </article>`}



</section>`;

export const myTeamsView = (ctx) => {
    userService.getMyTeams(ctx.user._id)
        .then(teams => {
            console.log(teams);
            ctx.render(teamsTemplate(ctx, teams))
        })
};
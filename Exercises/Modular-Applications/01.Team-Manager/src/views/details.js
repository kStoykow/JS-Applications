import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as  userService from '../services/user.js';

const guestMembers = (member) => html`<li>${member.user.username}</li>`;

const guests = (team, members) => html`<section id="team-home">
    <article class="layout">
        <img src="${team.logoUrl}" class="team-logo left-col">
        <div class="tm-preview">
            <h2>${team.name}</h2>
            <p>${team.description}</p>
            <span class="details">${members.length} Members</span>
        </div>

        <div class="pad-large">
            <h3>Members</h3>
            <ul class="tm-members">
                ${members.map(guestMembers)}
            </ul>
        </div>
    </article>
</section>`;



function buttons (ctx, members, team){
    if(!members.find(e=>e.user._id!==ctx.user._id)){
        return html`<a href="/details/${team._id}" class="action" @click=${join.bind(null, team._id)}>Join team</a>`;
    }
    if(members.find(e=>e.user._id == ctx.user._id)?.status=='member'){
        return html`<a href="/details/${team._id}" class="action invert" @click=${deciline.bind(null, ctx.user)}>Leave team</a>`;
    }
    if(members.find(e=>e.user._id == ctx.user._id)?.status=='pending'){
        return html` Membership pending. <a href="/details/${team._id}" @click=${deciline.bind(null, ctx.user)}>Cancel request</a>`;
    }
    return nothing;
}

const userOwnerMembers = (member, team) => html`<li>${member.user.username}<a href="/details/${team._id}" class="tm-control action" @click=${deciline.bind(null, member)}>Remove from team</a></li>`;
const userMembers = (member) => html`<li>${member.user.username}</li>`;
const me = (member) => html`<li>${member.user.username}</li>`;

const requestMembers=(member,team)=>html`
<li>${member.user.username}<a href="/details/${team._id}" class="tm-control action" @click=${approve.bind(null, member)}>Approve</a>
<a href="/details/${team._id}" class="tm-control action" @click=${deciline.bind(null, member)}>Decline</a></li>`;

const users = (ctx, team, members) => html`
<section id="team-home">
    <article class="layout">
        <img src="${team.logoUrl}" class="team-logo left-col">
        <div class="tm-preview">
            <h2>${team.name}</h2>
            <p>${team.description}</p>
            <span class="details">${members.length} Members</span>
            <div>
                ${ctx.user._id==team._ownerId ? html`<a href="/edit" class="action">Edit team</a>` : nothing}
                ${buttons(ctx, members, team)}
            </div>
        </div>
        <div class="pad-large">
            <h3>Members</h3>
            <ul class="tm-members">

                ${members.filter(e=>e.status=='member').filter(e => e.user._id == ctx.user._id).length > 0
                ? members.filter(e=>e.status=='member').filter(e => e.user._id == ctx.user._id).map(me) 
                :nothing}

                ${ctx.user._id==team._ownerId
                ? html`${members.filter(e=>e.status=='member').filter(e => e.user._id != ctx.user._id).map(e=>userOwnerMembers(e, team))}`
                : html`${members.filter(e=>e.status=='member').filter(e => e.user._id != ctx.user._id).map(userMembers)}`
                }
            </ul>
        </div>

        ${ctx.user._id==team._ownerId
            ? html`<div class="pad-large">
                        <h3>Membership Requests</h3>
                        <ul class="tm-members">
                            ${members.filter(e=>e.status=='pending').map(e=>requestMembers(e, team))}
                        </ul>
                    </div>`
        : nothing}
        
    </article>
</section>`

const join = (teamId)=> userService.joinTeam(teamId);
const approve = (member) => userService.approveJoin(member._id, {status: "member"} );
const deciline = (member) => userService.decilineJoin(member._id);

const detailsTemplate = (ctx, team, members) => html`
    ${ctx.user
        ? users(ctx, team, members)
        : guests(team, members)}
    `;

export const detailsView = (ctx) => {
    const teamId = ctx.params.id;

    Promise.all([
        userService.getOne(teamId),
        userService.getTeamMembers(teamId)
    ])
        .then(([team, members]) => ctx.render(detailsTemplate(ctx, team, members)));
}
import { html } from '../../node_modules/lit-html/lit-html.js';
import * as userService from '../services/user.js';

const idea = (idea) => html`
    <div class="card overflow-hidden current-card details" style="width: 20rem; height: 18rem;">
        <div class="card-body">
            <p class="card-text">${idea.title}</p>
        </div>
        <img class="card-image" src="${idea.img}" alt="Card image cap">
        <a class="btn" href="/details/${idea._id}">Details</a>
    </div>
`;

const dashboardTemplate = (ideas) => html`
<div id="dashboard-holder">
    ${ideas.length > 0
        ? ideas.map(idea)
        : html`<h1>No ideas yet! Be the first one :)</h1>`}
</div>
`;

export const dashboardView = (ctx) => userService.getIdeas()
    .then(ideas => ctx.render(dashboardTemplate(ideas)));
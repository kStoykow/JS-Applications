import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as  userService from '../services/user.js';

const detailsTemplate = (ctx, idea) => html`
<div class="container home some">
    <img class="det-img" src="${idea.img}" />
    <div class="desc">
        <h2 class="display-5">${idea.title}</h2>
        <p class="infoType">Description:</p>
        <p class="idea-description">${idea.description}</p>
    </div>
    <div class="text-center">
        ${ctx.user?._id == idea._ownerId
        ? html`<a class="btn detb" href="" @click=${deleteHandler.bind(null, ctx, idea)}>Delete</a>`
        : nothing
        }
    </div>
</div>
`;

const deleteHandler = (ctx, idea, e) => userService.deleteIdea(idea._id).then(() => ctx.page.redirect('/dashboard'));

export const detailsView = (ctx) => {
    const ideaId = ctx.params.id;

    userService.getIdea(ideaId)
        .then(idea => ctx.render(detailsTemplate(ctx, idea)));
}
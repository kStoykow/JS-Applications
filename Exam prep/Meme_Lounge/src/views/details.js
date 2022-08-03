import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as  userService from '../services/user.js';

const detailsTemplate = (ctx, meme) => html`
<section id="meme-details">
    <h1>Meme Title: ${meme.title}</h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src="${meme.imageUrl}">
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p>${meme.description}</p>

            ${ctx.user?._id == meme._ownerId
        ? html`<a class="button warning" href="/edit/${meme._id}">Edit</a>
            <button class="button danger" @click=${deleteHandler.bind(null, ctx, meme._id)}>Delete</button>`
        : nothing}
        </div>
    </div>
</section>
`;

const deleteHandler = (ctx, memeId, e) => userService.del(memeId).then(() => ctx.page.redirect('/meme'));

export const detailsView = (ctx) => {
    const memeId = ctx.params.id;

    userService.getOne(memeId)
        .then(meme => ctx.render(detailsTemplate(ctx, meme)));
}
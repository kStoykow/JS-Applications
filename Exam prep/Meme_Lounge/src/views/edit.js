import { html } from '../../node_modules/lit-html/lit-html.js';
import * as userService from '../services/user.js';


const editTemplate = (ctx, meme) => html`
<section id="edit-meme">
    <form id="edit-form" @submit=${editHandler.bind(null, ctx, meme._id)}>
        <h1>Edit Meme</h1>
        <div class="container">
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title" .value=${meme.title}>
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description"
                .value=${meme.description}></textarea>
            <label for="imageUrl">Image Url</label>
            <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value=${meme.imageUrl}>
            <input type="submit" class="registerbtn button" value="Edit Meme">
        </div>
    </form>
</section>
`;


const editHandler = (ctx, memeId, e) => {
    e.preventDefault();

    console.log(memeId);
    const data = Object.fromEntries(new FormData(e.target));

    userService.edit(memeId, data)
        .then(() => ctx.page.redirect(`/details/${memeId}`))
        .catch(err => alert(err.message));

}

export const editView = (ctx) => {
    const memeId = ctx.params.id;

    userService.getOne(memeId)
        .then(meme => ctx.render(editTemplate(ctx, meme)))
}
import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as  userService from '../services/user.js';

const createTemplate = (ctx) => html`
<section id="create-meme">
    <form id="create-form" @submit=${createHandler.bind(null, ctx)}>
        <div class="container">
            <h1>Create Meme</h1>
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title">
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description"></textarea>
            <label for="imageUrl">Meme Image</label>
            <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
            <input type="submit" class="registerbtn button" value="Create Meme">
        </div>
    </form>
</section>
`;

const createHandler = (ctx, e) => {
    e.preventDefault();
    const { title, description, imageUrl } = Object.fromEntries(new FormData(e.target));

    if (title == '' || description == '' || imageUrl == '') {
        return alert('All fields must be filled.');
    }

    userService.create({ title, description, imageUrl })
        .then(() => ctx.page.redirect('/'));
}


export const createView = (ctx) => ctx.render(createTemplate(ctx));


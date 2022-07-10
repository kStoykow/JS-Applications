import { html } from "../../node_modules/lit-html/lit-html.js";

import * as userService from '../services/user.js';

const createTemplate = (ctx) => html`
<section id="add-movie" class="view-section">
    <form id="add-movie-form" class="text-center border border-light p-5" action="#" method=""
        @submit=${createHandler.bind(null, ctx)}>
        <h1>Add Movie</h1>
        <div class="form-group">
            <label for="title">Movie Title</label>
            <input id="title" type="text" class="form-control" placeholder="Title" name="title" value="" />
        </div>
        <div class="form-group">
            <label for="description">Movie Description</label>
            <textarea class="form-control" placeholder="Description" name="description"></textarea>
        </div>
        <div class="form-group">
            <label for="imageUrl">Image url</label>
            <input id="imageUrl" type="text" class="form-control" placeholder="Image Url" name="img" value="" />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</section>
`;

const createHandler = (ctx, e) => {
    e.preventDefault();
    const { title, description, img } = Object.fromEntries(new FormData(e.target));

    if (title != '', description != '', img != '') {
        userService.addMovie(title, description, img)
            .then(() => ctx.page.redirect('/'));
    }
}

export const createView = (ctx) => ctx.render(createTemplate(ctx));
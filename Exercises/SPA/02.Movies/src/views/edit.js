import { html } from "../../node_modules/lit-html/lit-html.js";
import * as userService from '../services/user.js';

const editTemplate = (ctx, movie) => html`
<section id="edit-movie" class="view-section">
    <form class="text-center border border-light p-5" action="#" method="" @submit=${editHandler.bind(null, ctx,
        movie)}>
        <h1>Edit Movie</h1>
        <div class="form-group">
            <label for="title">Movie Title</label>
            <input id="title" type="text" class="form-control" placeholder="Movie Title" .value=${movie.title}
                name="title" />
        </div>
        <div class="form-group">
            <label for="description">Movie Description</label>
            <textarea class="form-control" placeholder="Movie Description..." name="description"
                .value=${movie.description}></textarea>
        </div>
        <div class="form-group">
            <label for="imageUrl">Image url</label>
            <input id="imageUrl" type="text" class="form-control" placeholder="Image Url" .value=${movie.img}
                name="img" />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</section>
`;

const editHandler = (ctx, movie, e) => {
    e.preventDefault();

    const { title, description, img } = Object.fromEntries(new FormData(e.target));

    userService.editMovie(movie._id, title, description, img)
        .then(() => ctx.page.redirect(`/details/${movie._id}`))
}
export const editView = (ctx) => {
    const movieId = ctx.params.id;

    userService.getMovie(movieId)
        .then(movie => ctx.render(editTemplate(ctx, movie)))
}
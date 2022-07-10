import { html } from "../../node_modules/lit-html/lit-html.js";
import * as userService from '../services/user.js';

const owner = (ctx, movie) => html`<a class="btn btn-danger" @click=${deleteHandler.bind(null, ctx, movie._id)}>Delete</a>
<a class="btn btn-warning" href="/edit/${movie._id}">Edit</a>`;

const likeBtn = (ctx, isLiked, likes) => html`
${isLiked 
    ? html`<span class="enrolled-span">Liked: ${likes}</span>` 
    : html`<a class="btn btn-primary" href="/details/${ctx.params.id}" @click=${likeHandler.bind(null,ctx)}> Like</a>`}
`;

const likeBtnView = (ctx, isLiked, likes) => html`
${ctx.user
    ? likeBtn(ctx, isLiked, likes) 
    : likeInfo(likes)
}`;

const likeInfo = (likes) => html`
<span class="enrolled-span">Liked: ${likes}</span>
`;

const detailsTemplate = (ctx, movie, isLiked, likes) => html`
<section id="movie-example" class="view-section">
    <div class="container">
        <div class="row bg-light text-dark">
            <h1>${movie.title}</h1>

            <div class="col-md-8">
                <img class="img-thumbnail" src=${movie.img} alt="Movie" />
            </div>
            <div class="col-md-4 text-center">
                <h3 class="my-3">Movie Description</h3>
                <p>${movie.description}</p>

                ${ctx.user?._id == movie._ownerId
                ? owner(ctx, movie)
                : likeBtnView(ctx, isLiked, likes)}
            </div>
        </div>
    </div>
</section>
`;

const likeHandler=(ctx, e)=>{
    const movieId= ctx.params.id;

    userService.like(movieId)
        .then(()=>ctx.page.redirect(`/details/${movieId}`));
}

const deleteHandler=(ctx, movieId, e)=>{
   userService.deleteMovie(movieId)
   .then(()=>ctx.page.redirect('/')); 
}

export const detailsView = (ctx) => {
    const movieId = ctx.params.id;
    const userId = ctx.user?._id;

    Promise.all([
        userService.getMovie(movieId),
        userService.isLiked(movieId, userId),
        userService.getLikes(movieId)
    ])
        .then(([movie, isLiked, likes]) => ctx.render(detailsTemplate(ctx, movie, Boolean(isLiked.length), likes)));
}
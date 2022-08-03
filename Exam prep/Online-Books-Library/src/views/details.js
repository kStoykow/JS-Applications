import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as  userService from '../services/user.js';

const buttons = (ctx, book) => html`
<div class="actions">
    <a class="button" href="/edit/${book._id}">Edit</a>
    <a class="button" href="#" @click=${deleteHandler.bind(null, ctx, book._id)}>Delete</a>

    <!-- Bonus -->
    <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
    <!-- <a class="button" href="#">Like</a> -->
    <!-- Bonus -->
</div>`;

const detailsTemplate = (ctx, book) => html`
<section id="details-page" class="details">
    <div class="book-information">
        <h3>${book.title}</h3>
        <p class="type">Type: ${book.type}</p>
        <p class="img"><img src="${book.imageUrl}"></p>
        ${ctx.user?._id == book._ownerId ? buttons(ctx, book) : nothing}
        <div class="likes">
            <img class="hearts" src="/images/heart.png">
            <span id="total-likes">Likes: 0</span>
        </div>
    </div>

    <div class="book-description">
        <h3>Description:</h3>
        <p>${book.description}</p>
    </div>

</section>
`;

const deleteHandler = (ctx, bookId, e) => {
    e.preventDefault();

    userService.del(bookId).then(() => ctx.page.redirect('/'));
}

export const detailsView = (ctx) => {
    const bookId = ctx.params.id;

    userService.getOne(bookId).then(book => {
        ctx.render(detailsTemplate(ctx, book))
    });
}
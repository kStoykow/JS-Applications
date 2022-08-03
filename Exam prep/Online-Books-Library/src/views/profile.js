import { html } from '../../node_modules/lit-html/lit-html.js';
import * as  userService from '../services/user.js';

const book = (book) => html`
<li class="otherBooks">
    <h3>${book.title}</h3>
    <p>Type: ${book.type}</p>
    <p class="img"><img src="${book.imageUrl}"></p>
    <a class="button" href="/details/${book._id}">Details</a>
</li>`;

const profileTemplate = (books) => html`
<section id="my-books-page" class="my-books">
    <h1>My Books</h1>
    ${books.length > 0 
        ? html`<ul class="my-books-list">
                 ${books.map(book)}
             </ul>` 
    : html`<p class="no-books">No books in database!</p>`}
   </section>`;


export const profileView = (ctx) => userService.myBooks(ctx.user._id)
    .then(books => ctx.render(profileTemplate(books)));
import { html } from '../../node_modules/lit-html/lit-html.js';
import * as userService from '../services/user.js';


const editTemplate = (ctx, book) => html`
<section id="edit-page" class="edit">
    <form id="edit-form" action="#" method="" @submit=${editHandler.bind(null, ctx, book._id)}>
        <fieldset>
            <legend>Edit my Book</legend>
            <p class="field">
                <label for="title">Title</label>
                <span class="input">
                    <input type="text" name="title" id="title" .value=${book.title}>
                </span>
            </p>
            <p class="field">
                <label for="description">Description</label>
                <span class="input">
                    <textarea name="description" id="description" .value=${book.description}></textarea>
                </span>
            </p>
            <p class="field">
                <label for="image">Image</label>
                <span class="input">
                    <input type="text" name="imageUrl" id="image" .value=${book.imageUrl}>
                </span>
            </p>
            <p class="field">
                <label for="type">Type</label>
                <span class="input">
                    <select id="type" name="type" .value=${book.type}>
                        <option value="Fiction">Fiction</option>
                        <option value="Romance">Romance</option>
                        <option value="Mistery">Mistery</option>
                        <option value="Classic">Clasic</option>
                        <option value="Other">Other</option>
                    </select>
                </span>
            </p>
            <input class="button submit" type="submit" value="Save">
        </fieldset>
    </form>
</section>
`;


const editHandler = (ctx, bookId, e) => {
    e.preventDefault();

    const { title, description, imageUrl, type } = Object.fromEntries(new FormData(e.target));
   
    if (title == '' || description == '' || imageUrl == '' || type == '') {
        return alert('All fields must be filled.');
    }

    userService.edit(bookId, title, description, imageUrl, type)
        .then(() => ctx.page.redirect('/'))
        .catch(err => alert(err.message));

}

export const editView = (ctx) => {
    const bookId = ctx.params.id;

    userService.getOne(bookId)
        .then(product => ctx.render(editTemplate(ctx, product)))
}
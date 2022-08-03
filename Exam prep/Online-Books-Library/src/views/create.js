import { html } from '../../node_modules/lit-html/lit-html.js';
import * as  userService from '../services/user.js';

const createTemplate = (ctx) => html`
<section id="create-page" class="create">
    <form id="create-form" action="" method="" @submit=${createHandler.bind(null, ctx)}>
        <fieldset>
            <legend>Add new Book</legend>
            <p class="field">
                <label for="title">Title</label>
                <span class="input">
                    <input type="text" name="title" id="title" placeholder="Title">
                </span>
            </p>
            <p class="field">
                <label for="description">Description</label>
                <span class="input">
                    <textarea name="description" id="description" placeholder="Description"></textarea>
                </span>
            </p>
            <p class="field">
                <label for="image">Image</label>
                <span class="input">
                    <input type="text" name="imageUrl" id="image" placeholder="Image">
                </span>
            </p>
            <p class="field">
                <label for="type">Type</label>
                <span class="input">
                    <select id="type" name="type">
                        <option value="Fiction">Fiction</option>
                        <option value="Romance">Romance</option>
                        <option value="Mistery">Mistery</option>
                        <option value="Classic">Clasic</option>
                        <option value="Other">Other</option>
                    </select>
                </span>
            </p>
            <input class="button submit" type="submit" value="Add Book">
        </fieldset>
    </form>
</section>
`;



const createHandler = (ctx, e) => {
    e.preventDefault();
    const { title, description, imageUrl, type } = Object.fromEntries(new FormData(e.target));
   
    if (title == '' || description == '' || imageUrl == '' || type == '') {
        return alert('All fields must be filled.');
    }

    userService.create(title, description, imageUrl, type)
        .then(() => ctx.page.redirect('/'));
}


export const createView = (ctx) => ctx.render(createTemplate(ctx));


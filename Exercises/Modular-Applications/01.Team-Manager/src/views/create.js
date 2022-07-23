import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as  userService from '../services/user.js';

const createTemplate = (ctx) => html`
<section id="create">
    <article class="narrow">
        <header class="pad-med">
            <h1>New Team</h1>
        </header>
        <form id="create-form" class="main-form pad-large" @submit=${createHandler.bind(null, ctx)}>
            <div class="error" style="display:none">Error message.</div>
            <label>Team name: <input type="text" name="name"></label>
            <label>Logo URL: <input type="text" name="logoUrl"></label>
            <label>Description: <textarea name="description"></textarea></label>
            <input class="action cta" type="submit" value="Create Team">
        </form>
    </article>
</section>
`;



const createHandler = (ctx, e) => {
    e.preventDefault();
    const error = document.querySelector('.error');

    const { name, logoUrl, description } = Object.fromEntries(new FormData(e.target));
    if (name.length < 4) {
        error.textContent = 'Team name must be atleast 4 symbols.';
        error.style.display = 'block';
        return;
    } else if (logoUrl == '') {
        error.textContent = 'Logo is must.';
        error.style.display = 'block';
        return;
    } else if (description.length < 10) {
        error.textContent = 'Description must be atleast 10 symbols.';
        error.style.display = 'block';
        return;
    }

    userService.create({ name, logoUrl, description })
        .then(res => ctx.page.redirect(`/details/${res._id}`));
}

export const createView = (ctx) => ctx.render(createTemplate(ctx));
import { html } from '../../node_modules/lit-html/lit-html.js';
import * as userService from '../services/user.js';


const editTemplate = (ctx, team) => html`
<section id="edit">
    <article class="narrow">
        <header class="pad-med">
            <h1>Edit Team</h1>
        </header>
        <form id="edit-form" class="main-form pad-large" @submit=${editHandler.bind(null, ctx, team)}>
            <div class="error">Error message.</div>
            <label>Team name: <input type="text" name="name"></label>
            <label>Logo URL: <input type="text" name="logoUrl"></label>
            <label>Description: <textarea name="description"></textarea></label>
            <input class="action cta" type="submit" value="Save Changes">
        </form>
    </article>
</section>
`;


const editHandler = (ctx, team, e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.target));

    userService.edit(team._id, data)
        .then(() => ctx.page.redirect('/'))
        .catch(err => alert(err.message));

}

export const editView = (ctx) => {
    const teamId = ctx.params.id;

    userService.getOne(teamId)
        .then(product => ctx.render(editTemplate(ctx, team)))
}
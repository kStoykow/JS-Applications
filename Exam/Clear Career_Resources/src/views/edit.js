import { html } from '../../node_modules/lit-html/lit-html.js';
import * as userService from '../services/user.js';


const editTemplate = (ctx, offer) => html`
<section id="edit">
    <div class="form">
        <h2>Edit Offer</h2>
        <form class="edit-form" @submit=${editHandler.bind(null, ctx, offer._id)}>
            <input type="text" name="title" id="job-title" placeholder="Title" .value=${offer.title} />
            <input type="text" name="imageUrl" id="job-logo" placeholder="Company logo url" .value=${offer.imageUrl} />
            <input type="text" name="category" id="job-category" placeholder="Category" .value=${offer.category} />
            <textarea id="job-description" name="description" placeholder="Description" rows="4" cols="50"
                .value=${offer.description}></textarea>
            <textarea id="job-requirements" name="requirements" placeholder="Requirements" rows="4" cols="50"
                .value=${offer.requirements}></textarea>
            <input type="text" name="salary" id="job-salary" placeholder="Salary" .value=${offer.salary} />

            <button type="submit">post</button>
        </form>
    </div>
</section>
`;


const editHandler = (ctx, offer, e) => {
    e.preventDefault();
    const { title, imageUrl, category, description, requirements, salary } = Object.fromEntries(new FormData(e.target));

    const data = { title, imageUrl, category, description, requirements, salary };

    if (title == '' || imageUrl == '' || category == '' || description == '' || requirements == '' || salary == '') {
        return alert('All fileds must be filled.');
    }

    userService.edit(offer, data)
        .then(offer => ctx.page.redirect(`/details/${offer._id}`))
        .catch(err => alert(err.message));

}

export const editView = (ctx) => {
    const offerId = ctx.params.id;

    userService.getOne(offerId)
        .then(offer => ctx.render(editTemplate(ctx, offer)))
}
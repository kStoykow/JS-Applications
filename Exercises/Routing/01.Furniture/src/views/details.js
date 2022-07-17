import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as  userService from '../services/user.js';

const detailsTemplate = (ctx, idea) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Furniture Details</h1>
    </div>
</div>
<div class="row space-top">
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src="/images/chair.jpg" />
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <p>Make: <span>make</span></p>
        <p>Model: <span>model</span></p>
        <p>Year: <span>year</span></p>
        <p>Description: <span>description</span></p>
        <p>Price: <span>price</span></p>
        <p>Material: <span>material</span></p>
        <div>
            <a href=”#” class="btn btn-info">Edit</a>
            <a href=”#” class="btn btn-red">Delete</a>
        </div>
    </div>
</div>
`;

const deleteHandler = (ctx, idea, e) => userService.deleteIdea(idea._id).then(() => ctx.page.redirect('/dashboard'));

export const detailsView = (ctx) => {
    const ideaId = ctx.params.id;

    userService.getIdea(ideaId)
        .then(idea => ctx.render(detailsTemplate(ctx, idea)));
}
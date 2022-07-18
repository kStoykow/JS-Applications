import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as  userService from '../services/user.js';

const detailsTemplate = (ctx, product) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Furniture Details</h1>
    </div>
</div>
<div class="row space-top">
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src="${product.img}" />
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <p>Make: <span>${product.make}</span></p>
        <p>Model: <span>${product.model}</span></p>
        <p>Year: <span>${product.year}</span></p>
        <p>Description: <span>${product.description}</span></p>
        <p>Price: <span>${product.price}</span></p>
        <p>Material: <span>${product.material}</span></p>

        ${ctx.user?._id == product._ownerId
            ? html`<div>
            <a href="/edit/${product._id}" class="btn btn-info">Edit</a>
            <a href="/" class="btn btn-red" @click=${deleteHandler.bind(null, ctx, product)}>Delete</a>
        </div>`
        : nothing}
    </div>
</div>
`;

const deleteHandler = (ctx, product, e) =>     userService.deleteProduct(product._id);

export const detailsView = (ctx) => {
    const productId = ctx.params.id;

    userService.getOne(productId)
        .then(product => ctx.render(detailsTemplate(ctx, product)));
}
import { html } from '../../node_modules/lit-html/lit-html.js';
import * as  userService from '../services/user.js';

const productTemplate = (product) => html`
<div class="col-md-4">
    <div class="card text-white bg-primary">
        <div class="card-body">
            <img src="${product.img}" />
            <p>${product.description}</p>
            <footer>
                <p>Price: <span>${product.price} $</span></p>
            </footer>
            <div>
                <a href="/details/${product._id}" class="btn btn-info">Details</a>
            </div>
        </div>
    </div>
</div>
`;

const homeTemplate = (ctx, products) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Welcome to Furniture System</h1>
        <p>Select furniture from the catalog to view details.</p>
    </div>
</div>

${products.map(productTemplate)}
`;

export const homeView = (ctx) => userService.getAll().then(products => ctx.render(homeTemplate(ctx, products)));
import { html } from '../../node_modules/lit-html/lit-html.js';
import * as userService from '../services/user.js';


const editTemplate = (ctx, product) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Edit Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${editHandler.bind(null, ctx, product._id)}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class="form-control" id="new-make" type="text" name="make" .value="${product.make}">
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class="form-control is-valid" id="new-model" type="text" name="model" .value="${product.model}">
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class="form-control is-invalid" id="new-year" type="number" name="year" .value="${product.year}">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class="form-control" id="new-description" type="text" name="description"
                    .value="${product.description}">
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class="form-control" id="new-price" type="number" name="price" .value="${product.price}">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class="form-control" id="new-image" type="text" name="img" .value="${product.img}">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control" id="new-material" type="text" name="material" .value="${product.material}">
            </div>
            <input type="submit" class="btn btn-info" value="Edit" />
        </div>
    </div>
</form>
`;


const editHandler = (ctx, productId, e) => {
    e.preventDefault();

    const { make, model, year, description, price, img, material } = Object.fromEntries(new FormData(e.target));

    if (userService.validateProduct() == true) {
        userService.edit(productId, { make, model, year, description, price, img, material })
            .then(() => ctx.page.redirect('/'))
            .catch(err => alert(err.message));
    }
}

export const editView = (ctx) => {
    const productId = ctx.params.id;

    userService.getOne(productId)
        .then(product => ctx.render(editTemplate(ctx, product)))
}
import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as  userService from '../services/user.js';

const createTemplate = (ctx) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Create New Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${createHandler.bind(null, ctx)}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class="form-control valid" id="new-make" type="text" name="make">
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class="form-control is-valid" id="new-model" type="text" name="model">
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class="form-control is-invalid" id="new-year" type="number" name="year">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class="form-control" id="new-description" type="text" name="description">
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class="form-control" id="new-price" type="number" name="price">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class="form-control" id="new-image" type="text" name="img">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control" id="new-material" type="text" name="material">
            </div>
            <input type="submit" class="btn btn-primary" value="Create" />
        </div>
    </div>
</form>
`;



const createHandler = (ctx, e) => {
    const makeElem = document.getElementById('new-make');
    const yearElem = document.getElementById('new-year');
    const descriptionElem = document.getElementById('new-description');
    const priceElem = document.getElementById('new-price');
    const imgElem = document.getElementById('new-img');
    const materialElem = document.getElementById('new-material');

    e.preventDefault();
    const { make, model, year, description, price, img, material } = Object.fromEntries(new FormData(e.target));

    if (make.length < 4) {
        makeElem.classList.add('is-invalid');
        makeElem.classList.remove('is-valid');
        return;
    } else {
        makeElem.classList.add('is-valid');
        makeElem.classList.remove('is-invalid');
    }
    if (Number(year) < 1950 || Number(year) > 2050) {
        yearElem.classList.add('is-invalid');
        yearElem.classList.remove('is-valid');
        return;
    } else {
        yearElem.classList.add('is-valid');
        yearElem.classList.remove('is-invalid');
    }
    if (description.length < 11) {
        descriptionElem.classList.add('is-invalid');
        descriptionElem.classList.remove('is-valid');
        return;
    } else {
        descriptionElem.classList.add('is-valid');
        descriptionElem.classList.remove('is-invalid');
    }
    if (Number(price) < 0) {
        descriptionElem.classList.add('is-invalid');
        descriptionElem.classList.remove('is-valid');
        return;
    } else {
        descriptionElem.classList.add('is-valid');
        descriptionElem.classList.remove('is-invalid');
    }
    if (img.value == '') {
        descriptionElem.classList.add('is-invalid');
        descriptionElem.classList.remove('is-valid');
        return;
    } else {
        descriptionElem.classList.add('is-valid');
        descriptionElem.classList.remove('is-invalid');
    }

    userService.createFurniture({ make, model, year, description, price, img, material })
        .then(res => {
            console.log(res);
            ctx.page.redirect('/dashboard');
        });
}

export const createView = (ctx) => {

    ctx.render(createTemplate(ctx));
}
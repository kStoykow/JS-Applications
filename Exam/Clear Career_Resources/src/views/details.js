import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as  userService from '../services/user.js';

const app = (ctx, offer, applications) => html`${applications == 0 ? html`<a href="" id="apply-btn" @click=${applyHandler.bind(null,ctx,offer)}>Apply</a>`: nothing}`;


const btns = (ctx, offer, applications) => html`<div id="action-buttons">

    ${ctx.user._id != offer._ownerId 
        ? app(ctx, offer, applications) 
        : html`<a href="/edit/${offer._id}" id="edit-btn">Edit</a>
    <a href="" id="delete-btn" @click=${deleteHandler.bind(null, ctx, offer)}>Delete</a>`}

</div>`;

const detailsTemplate = (ctx, offer, allCount, applications) => html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src="${offer.imageUrl}" alt="example1" />
        <p id="details-title">${offer.title}</p>
        <p id="details-category">
            Category: <span id="categories">${offer.category}</span>
        </p>
        <p id="details-salary">
            Salary: <span id="salary-number">${offer.salary}</span>
        </p>
        <div id="info-wrapper">
            <div id="details-description">
                <h4>Description</h4>
                <span>${offer.description}</span>
            </div>
            <div id="details-requirements">
                <h4>Requirements</h4>
                <span>${offer.requirements}</span>
            </div>
        </div>
        <p>Applications: <strong id="applications">${allCount}</strong></p>

        ${ctx.user
        ? btns(ctx, offer,applications)
        : nothing}

    </div>
</section>
`;


const applyHandler=(ctx,offer,e)=>{
    e.preventDefault();
    console.log(offer);
    userService.apply(offer._id)
    .then(res=>{
        console.log(res);
        ctx.page.redirect(`/details/${offer._id}`)
    })
}

const deleteHandler = (ctx, offer, e) => userService.del(offer._id).then(res => ctx.page.redirect('/'));

export const detailsView = (ctx) => {
    const offerId = ctx.params.id;

    Promise.all([
        userService.getOne(offerId),
        userService.offerCount(offerId),
        userService.myOfferCount(ctx.user?._id, offerId)
    ])
        .then(([offer,allCount, applications]) => {
            console.log(offer,allCount,applications);
            ctx.render(detailsTemplate(ctx, offer, allCount, applications))
        });
}
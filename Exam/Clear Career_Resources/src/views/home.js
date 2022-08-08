import { html } from '../../node_modules/lit-html/lit-html.js';
import * as userService from '../services/user.js';

const offer = (offer) => html`
<div class="offer">
  <img src="${offer.imageUrl}" alt="example1" />
  <p>
    <strong>Title: </strong><span class="title">${offer.title}</span>
  </p>
  <p><strong>Salary:</strong><span class="salary">${offer.salary}</span></p>
  <a class="details-btn" href="/details/${offer._id}">Details</a>
</div>`;

const homeTemplate = (offers) => html`
<section id="home">
  <img src="./images/pngkey.com-hunting-png-6697165-removebg-preview.png" alt="home" />
  <h2>Searching for a job?</h2>
  <h3>The right place for a new career start!</h3>
</section>

<section id="dashboard">
  <h2>Job Offers</h2>
  ${offers.length != 0
      ? offers.map(offer)
      : html`<h2>No offers yet.</h2>`}
</section>
`;

export const homeView = (ctx) => userService.allOffers()
  .then(offers => ctx.render(homeTemplate(offers)));
import { html, render } from './node_modules/lit-html/lit-html.js';
import { cats } from './catSeeder.js';

const cardTemplate = (cats) => html`
${cats.map(cat => html`
<li>
    <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
    <div class="info">
        <button class="showBtn" @click=${onShow}>Show status code</button>
        <div class="status" style="display: none" id="${cat.id}">
            <h4>Status Code: ${cat.statusCode}</h4>
            <p>${cat.statusMessage}</p>
        </div>
    </div>
</li>`)}
`;

const root = document.querySelector('#allCats');


function onShow(e) {
    const infoElem = document.querySelector('.status');

    if (infoElem.style.display == 'none') {
        infoElem.style.display = 'block';
        e.target.textContent = 'Hide status code';
    } else {
        infoElem.style.display = 'none';
        e.target.textContent = 'Show status code';
    }
}

render(cardTemplate(cats), root);
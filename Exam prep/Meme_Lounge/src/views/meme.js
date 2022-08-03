import { html } from '../../node_modules/lit-html/lit-html.js';
import * as userService from '../services/user.js';

const meme = (meme) => html`
<div class="meme">
    <div class="card">
        <div class="info">
            <p class="meme-title">${meme.title}</p>
            <img class="meme-image" alt="meme-img" src="${meme.imageUrl}">
        </div>
        <div id="data-buttons">
            <a class="button" href="/details/${meme._id}">Details</a>
        </div>
    </div>
</div>`;

const memeTemplate = (memes) => html`
<section id="meme-feed">
    <h1>All Memes</h1>
    <div id="memes">
        ${memes.length > 0
            ? memes.map(meme)
            : html`<p class="no-memes">No memes in database.</p>`}
    </div>
</section>`;


export const memeView = (ctx) => userService.allMeme().then(memes => ctx.render(memeTemplate(memes)));
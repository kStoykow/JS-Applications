import { html } from '../../node_modules/lit-html/lit-html.js';
import * as userService from '../services/user.js';

const meme = (meme) => html`
<div class="user-meme">
    <p class="user-meme-title">${meme.title}</p>
    <img class="userProfileImage" alt="meme-img" src="${meme.imageUrl}">
    <a class="button" href="/details/${meme._id}">Details</a>
</div>
`

const profileTemplate = (ctx, memes) => html`
<section id="user-profile-page" class="user-profile">
    <article class="user-info">
        ${ctx.user.gender == "male"
            ? html`<img id="user-avatar-url" alt="user-profile" src="/images/male.png">`
            : html`<img id="user-avatar-url" alt="user-profile" src="/images/female.png">`}

        <div class="user-content">
            <p>Username: ${ctx.user.username}</p>
            <p>Email: ${ctx.user.email}</p>
            <p>My memes count: ${memes.length}</p>
        </div>
    </article>
    <h1 id="user-listings-title">User Memes</h1>
    <div class="user-meme-listings">
        ${memes.length > 0
        ? memes.map(meme) :
        html`<p class="no-memes">No memes in database.</p>`}
    </div>
</section>`;

export const profileView = (ctx) => {
    console.log(ctx.user);
    userService.myMemes(ctx.user._id)
        .then(memes => ctx.render(profileTemplate(ctx, memes)))
};
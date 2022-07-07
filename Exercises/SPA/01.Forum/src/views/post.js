import { html } from '../../node_modules/lit-html/lit-html.js';
import * as postService from '../services/post.js';
import { commentForm } from './comments.js';
import { commentsView } from './comments.js';

const postTemplate = (ctx, postId, post, commentsTemplate) => html`
<div class="topic-content">
    <div class="topic-name-wrapper">

        <div class="comment">
            <div class="header">
                <img src="../../static/profile.png" alt="avatar">
                <p><span>${post.username}</span> posted on <time>2020-10-10 12:08:28</time></p>

                <p class="post-content">${post.postText}</p>
            </div>
            ${commentsTemplate}
            ${commentForm(ctx, postId)}
        </div>
    </div>
</div>
`;

export const postView = (ctx) => {
    const postId = ctx.params.id;

    Promise.all([commentsView(postId), postService.getPost(postId)])
        .then(([commentsTemplate, post]) => ctx.render(postTemplate(ctx, postId, post, commentsTemplate)));
}
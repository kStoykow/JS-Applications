import { html } from "../../node_modules/lit-html/lit-html.js";
import * as postService from '../services/post.js';

const comment = (comment) => html`
<div class="topic-name-wrapper">
    <div class="topic-name">
        <p><strong>${comment.username}</strong> commented on <time>3/15/2021, 12:39:02 AM</time></p>
        <div class="post-content">
            <p>${comment.postText}</p>
        </div>
    </div>
</div>
`;

const commentsTemplate = (comments) => html`
<div id="user-comment">
    ${comments.map(comment)}
</div>
`;

export const commentForm = (ctx, postId) => html`
<div class="answer-comment">
    <p><span>currentUser</span> comment:</p>
    <div class="answer">
        <form @submit=${commentHandler.bind(null, ctx, postId)}>
            <textarea name="postText" id="comment" cols="30" rows="10"></textarea>
            <div>
                <label for="username">Username <span class="red">*</span></label>
                <input type="text" name="username" id="username">
            </div>
            <button>Post</button>
        </form>
    </div>
</div>`;

const commentHandler = (ctx, postId, e) => {
    e.preventDefault();
    const formData = document.querySelector('form');
    const data = Object.fromEntries(new FormData(e.currentTarget));
    data.postId = postId;

    if (data.postText != '' && data.username != '') {
        postService.comment(data)
            .then(() => {
                ctx.page.redirect(`/details/${postId}`);
                formData.reset();
            })

    }
};

export const commentsView = (postId) => postService.getComments()
    .then(comments => comments.filter(e => e.postId == postId))
    .then(comments => commentsTemplate(comments));
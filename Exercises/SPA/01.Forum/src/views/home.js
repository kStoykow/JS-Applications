import { html } from '../../node_modules/lit-html/lit-html.js';
import { topicsView } from './topics.js';

import * as postServices from '../services/post.js';

const homeTemplate = (ctx, topicsView, posts) => html`
<main>
    <div class="new-topic-border">
        <div class="header-background">
            <span>New Topic</span>
        </div>
        <form @submit=${submitHandler.bind(null, ctx)}>
            <div class="new-topic-title">
                <label for="topicName">Title <span class="red">*</span></label>
                <input type="text" name="topicName" id="topicName">
            </div>
            <div class="new-topic-title">
                <label for="username">Username <span class="red">*</span></label>
                <input type="text" name="username" id="username">
            </div>
            <div class="new-topic-content">
                <label for="postText">Post <span class="red">*</span></label>
                <textarea type="text" name="postText" id="postText" rows="8" class="height"></textarea>
            </div>
            <div class="new-topic-buttons">
                <button class="cancel" @click=${clearHandler}>Cancel</button>
                <button class="public">Post</button>
            </div>
        </form>
    </div>

    <div class="topic-title">
        <!-- topic component  -->
        ${topicsView(posts)}
</main>`;

const submitHandler = (ctx, e) => {
    e.preventDefault();

    const formData = document.querySelector('form');
    const data = Object.fromEntries(new FormData(e.currentTarget));
    if (data.topicName != '' && data.username != '' && data.postText != '') {
        postServices.createPost(data)
            .then(() => {
                formData.reset();
                ctx.page.redirect('/');
            });
    }
}

const clearHandler = () => {
    const formData = document.querySelector('form');
    formData.reset();
}

export const homeView = (ctx) => {
    postServices.getPosts()
        .then(posts => ctx.render(homeTemplate(ctx, topicsView, posts)))
};
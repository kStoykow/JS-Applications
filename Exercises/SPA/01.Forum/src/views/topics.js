import { html } from '../../node_modules/lit-html/lit-html.js';

const topicTemplate = (post) => html`
<div class="topic-name-wrapper">
    <div class="topic-name">
        <a href="/details/${post._id}" class="normal">
            <h2>${post.topicName}</h2>
        </a>
        <div class="columns">
            <div>
                <p>Date: <time>2020-10-10T12:08:28.451Z</time></p>
                <div class="nick-name">
                    <p>Username: <span>${post.username}</span></p>
                </div>
            </div>
        </div>
    </div>
</div>`;

const topicsTemplate = (posts) => html`
<div class="topic-container">
    ${posts.map(topicTemplate)}
</div>`;

export const topicsView = (posts) => topicsTemplate(posts);
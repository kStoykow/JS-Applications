import { html } from '../../node_modules/lit-html/lit-html.js';

const modalTemplate = () => html`
<div class="overlay">
    <div class="modal">
        <p>Overlay message</p>
        <a href="#" class="action">Action</a>
    </div>
</div>`;

export const modalView = (ctx) => ctx.render(modalTemplate());
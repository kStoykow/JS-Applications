import { html } from "../../node_modules/lit-html/lit-html.js";

const footerTemplate = html`
    <p>This site is designed to be used for training purposes at SoftUni.</p>
    <p>You can find the real SoftUni forum at this link:</p>
    <p><span><a href="https://softuni.bg/forum">https://softuni.bg/forum</a></span></p>
`;

export const footerView = (ctx) => footerTemplate;
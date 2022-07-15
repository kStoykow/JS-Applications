import { html, render } from './node_modules/lit-html/lit-html.js';

const root = document.getElementById('root');

const form = document.querySelector('form');


const townsTemplate = (towns) => html`
<ul>
    ${towns.map(e => html`<li>${e}</li>`)}
</ul>
`

form.addEventListener('submit', function onSubmit(e) {
    e.preventDefault();
    root.firstChild.remove();

    const formData = new FormData(e.target);
    const townsData = formData.get('towns');
    const towns = townsData.split(', ');

    render(townsTemplate(towns), root);
    form.reset();
});
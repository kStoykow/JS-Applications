import { html, render } from './node_modules/lit-html/lit-html.js';

import { towns } from './towns.js';

const listElem = document.getElementById('towns');
const input = document.getElementById('searchText');
const btn = document.querySelector('button');
const result = document.getElementById('result');

const townTemplate = (towns) => html`
<ul>
   ${towns.map(e => html`<li>${e}</li>`)}
</ul>
`;

render(townTemplate(towns), listElem);

function search(e) {
   const list = [...listElem.querySelectorAll('li')];
   list.forEach(e => e.className = '');
   result.textContent = '';

   const matches = list.filter(e => e.textContent.includes(input.value));
   matches.forEach(e => e.className = 'active');
   result.textContent = `${matches.length} matches found`;
}

btn.addEventListener('click', search);
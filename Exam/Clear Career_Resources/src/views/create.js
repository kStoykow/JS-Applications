import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as  userService from '../services/user.js';

const createTemplate = (ctx) => html`
        <section id="create">
          <div class="form">
            <h2>Create Offer</h2>
            <form class="create-form" @submit=${createHandler.bind(null, ctx)}>
              <input type="text" name="title" id="job-title" placeholder="Title" />
              <input type="text" name="imageUrl" id="job-logo" placeholder="Company logo url" />
              <input type="text" name="category" id="job-category" placeholder="Category" />
              <textarea id="job-description" name="description" placeholder="Description" rows="4" cols="50"></textarea>
              <textarea id="job-requirements" name="requirements" placeholder="Requirements" rows="4" cols="50"></textarea>
              <input type="text" name="salary" id="job-salary" placeholder="Salary" />
        
              <button type="submit">post</button>
            </form>
          </div>
        </section>
`;



const createHandler = (ctx, e) => {
  e.preventDefault();
  const { title, imageUrl, category, description, requirements, salary } = Object.fromEntries(new FormData(e.target));

  const data = { title, imageUrl, category, description, requirements, salary };

  if (title == '' || imageUrl == '' || category == '' || description == '' || requirements == '' || salary == '') {
    return alert('All fileds must be filled.');
  }
  
  userService.create(data)
    .then(() => ctx.page.redirect('/'));
}


export const createView = (ctx) => ctx.render(createTemplate(ctx));


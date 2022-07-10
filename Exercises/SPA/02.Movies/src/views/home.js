import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import * as userService from '../services/user.js';

const homeTemplate = (ctx, movies) => html`
<section id="home-page" class="view-section">
  <div class="jumbotron jumbotron-fluid text-light" style="background-color: #343a40">
    <img src="https://slicksmovieblog.files.wordpress.com/2014/08/cropped-movie-banner-e1408372575210.jpg"
      class="img-fluid" alt="Responsive image" style="width: 150%; height: 200px" />
    <h1 class="display-4">Movies</h1>
    <p class="lead">
      Unlimited movies, TV shows, and more. Watch anywhere. Cancel
      anytime.
    </p>
  </div>

  <h1 class="text-center">Movies</h1>

  ${ctx.user
  ? html`<section id="add-movie-button" class="user">
    <a href="/create" class="btn btn-warning">Add Movie</a>
  </section>`
  : nothing}

  <section id="movie">
    <div class="mt-3">
      <div class="row d-flex d-wrap">
        <ul id="movies-list" class="card-deck d-flex justify-content-center">
          <!-- movie list -->
          ${movies.map(movie)}
        </ul>
      </div>
    </div>
  </section>
</section>
`;

const movie = (movie) => html`
  <li class="card">
    <div class="row bg-light text-dark">
  
      <div class="col-md-8">
        <img class="img-thumbnail" src="${movie.img}" alt="Movie" />
        <h1>${movie.title}</h1>
        <div class="col-md-4 text-center">
          <a class="btn btn-primary" href="/details/${movie._id}">Details</a>
        </div>
      </div>
  
    </div>
  </li>
  `;

export const homeView = (ctx) => {
  userService.getMovies()
    .then(movies => ctx.render(homeTemplate(ctx, movies)));

};
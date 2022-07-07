import { html } from "../../node_modules/lit-html/lit-html.js";

const homeTemplate = () => html`
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

  <section id="add-movie-button" class="user">
    <a href="/create" class="btn btn-warning">Add Movie</a>
  </section>

  <section id="movie">
    <div class="mt-3">
      <div class="row d-flex d-wrap">
        <ul id="movies-list" class="card-deck d-flex justify-content-center">
          <!-- movie list -->
        </ul>
      </div>
    </div>
  </section>
</section>

`;

export const homeView = (ctx) => ctx.render(homeTemplate());
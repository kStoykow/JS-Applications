import page from '../node_modules/page/page.mjs';
import { renderer } from './middlewares/renderer.js';
import { homeView } from './views/home.js';
import { footerRender } from "./middlewares/footer.js";
import { postView } from './views/post.js';

page(renderer);
page(footerRender);

page('/', homeView);
page('/details/:id', postView);
page.start();
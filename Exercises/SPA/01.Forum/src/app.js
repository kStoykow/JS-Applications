import page from '../node_modules/page/page.mjs';
import { navRenderer } from './middlewares/navRenderer.js';
import { homeView } from './views/home.js';
import { footerRender } from "./middlewares/footer.js";

page(navRenderer);
page(footerRender);

page('/', homeView);
page.start();
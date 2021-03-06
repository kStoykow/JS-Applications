import page from '../node_modules/page/page.mjs';

import { ctxRender } from './middlewares/renderer.js';
import { navRender } from './middlewares/navRender.js';
import { footerRenderer } from './middlewares/footerRenderer.js';

import { homeView } from './views/home.js';
import { loginView } from './views/login.js';
import { logoutView } from './views/logout.js';
import { createView } from './views/create.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { registerView } from './views/register.js';

page(ctxRender);
page(navRender);
page(footerRenderer);

page('/', homeView);
page('/login', loginView);
page('/logout', logoutView);
page('/register', registerView);
page('/edit/:id', editView);
page('/details/:id', detailsView);
page('/create', createView);
page.start();
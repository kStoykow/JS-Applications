import page from '../node_modules/page/page.mjs';

import { renderMiddleware } from './middlewares/ctxRenderer.js';
import { navigationMiddleware } from './middlewares/navRender.js';
import { footerMiddleware } from './middlewares/footerRender.js';

import { homeView } from './views/home.js';
import { loginView } from './views/login.js';
import { logoutView } from './views/logout.js';
import { createView } from './views/create.js';
import { detailsView } from './views/details.js';
import { registerView } from './views/register.js';
import { dashboardView } from './views/dashboard.js';

page(renderMiddleware);
page(navigationMiddleware);
page(footerMiddleware);

page('/', homeView);
page('/login', loginView);
page('/logout', logoutView);
page('/create', createView);
page('/details/:id', detailsView);
page('/dashboard', dashboardView);
page('/register', registerView);

page.start();
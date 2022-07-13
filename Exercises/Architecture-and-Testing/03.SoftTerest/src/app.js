import page from '../node_modules/page/page.mjs';

import { renderMiddleware } from './middlewares/ctxRenderer.js';
import { navigationMiddleware } from './middlewares/navRender.js';
import { footerMiddleware } from './middlewares/footerRender.js';

import { homeView } from './views/home.js';
import { loginView } from './views/login.js';
import { logoutView } from './views/logout.js';
import { registerView } from './views/register.js';


page(renderMiddleware);
page(navigationMiddleware);
page(footerMiddleware);

page('/', homeView);
page('/login', loginView);
page('/logout', logoutView);
page('/register', registerView);

page.start();
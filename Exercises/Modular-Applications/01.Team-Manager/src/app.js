import page from '../node_modules/page/page.mjs';

import { renderMiddleware } from './middlewares/ctxRenderer.js';
import { navigationMiddleware } from './middlewares/navRender.js';

import { homeView } from './views/home.js';
import { editView } from './views/edit.js';
import { loginView } from './views/login.js';
import { logoutView } from './views/logout.js';
import { browseView } from './views/browse.js';
import { createView } from './views/create.js';
import { detailsView } from './views/details.js';
import { myTeamsView } from './views/my-teams.js';
import { registerView } from './views/register.js';

page(renderMiddleware);
page(navigationMiddleware);

page('/', homeView);
page('/edit', editView);
page('/login', loginView);
page('/browse', browseView);
page('/logout', logoutView);
page('/create', createView);
page('/teams', myTeamsView);
page('/register', registerView);
page('/details/:id', detailsView);

page.start();
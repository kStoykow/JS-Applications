import page from "../node_modules/page/page.mjs";

import { renderMiddleware } from './middlewares/ctxRenderer.js';
import { navigationMiddleware } from './middlewares/navRender.js';

import { editView } from "./views/edit.js";
import { homeView } from './views/home.js';
import { memeView } from "./views/meme.js";
import { loginView } from "./views/login.js";
import { logoutView } from "./views/logout.js";
import { createView } from "./views/create.js";
import { profileView } from "./views/profile.js";
import { detailsView } from "./views/details.js";
import { registerView } from "./views/register.js";


page(renderMiddleware);
page(navigationMiddleware);

page('/', homeView);
page('/meme', memeView);
page('/login', loginView);
page('/logout', logoutView);
page('/edit/:id', editView);
page('/create', createView);
page('/profile', profileView);
page('/register', registerView);
page('/details/:id', detailsView);

page.start();
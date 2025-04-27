import { createApp } from './core/app.js';
import { globalState } from './core/globalState.js';
import { createRouter, registerRouter } from './router/router.js';
import { routes } from './router/router.js';

const app = createApp();
app.use(globalState);
window.globalState = globalState;

const router = createRouter(routes);
registerRouter(router, 'app');
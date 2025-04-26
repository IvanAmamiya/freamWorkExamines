import { createApp } from './core/app.js';
import { globalState } from './core/globalState.js';
import { registerRouter } from './router/router.js';

// Create the application instance
const app = createApp();
app.use(globalState);
window.globalState = globalState;
registerRouter('app');
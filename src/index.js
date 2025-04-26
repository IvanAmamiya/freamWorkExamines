import { createApp } from './core/app.js';
import { globalState } from './core/globalState.js';
import { subscribeToState, updateStateAsync } from './examples/examples.js';
import { registerRouter } from './router/router.js';

// Create the application instance
const app = createApp();
// 只全局 use globalState
app.use(globalState);
window.globalState = globalState;
subscribeToState();
(async () => {
  await updateStateAsync('name', 'Async Name');
  await updateStateAsync('age', 35);
})();
registerRouter('app');
import { createApp } from './app.js';
import Bind from './bind.js';
import { globalState } from './bind.js';
import { subscribeToState, updateStateAsync } from './examples.js';
import { registerRouter } from './router.js';

// Create the application instance
const app = createApp();

// Use the Bind plugin for data binding, and keep the instance for global access
const bindInstance = app.use(Bind, {
  element: document.querySelector('#app'),
  data: {
    name: 'Alice',
    age: 25,
  },
});

// Use the global state management plugin
app.use(globalState);

// Expose proxyData and globalState to window for access in index.html scripts
window.proxyData = bindInstance && bindInstance.proxyData ? bindInstance.proxyData : null;
window.globalState = globalState;

// Initialize subscriptions to state changes
subscribeToState();

// Example: Update state asynchronously
(async () => {
  await updateStateAsync('name', 'Async Name');
  await updateStateAsync('age', 35);
})();

// 只注册新路由，不再直接操作 #app.innerHTML
registerRouter('app');
import Bind from './bind.js';
import { globalState } from './bind.js';
import { subscribeToState, updateStateAsync } from './examples.js';

document.addEventListener('DOMContentLoaded', () => {
  const appElement = document.querySelector('#app');

  const app = new Bind({
    element: appElement,
    data: {
      name: 'Alice',
      age: 25
    }
  });

  // Initialize subscriptions
  subscribeToState();

  // Example: Update state asynchronously
  (async () => {
    await updateStateAsync('name', 'Async Name');
    await updateStateAsync('age', 35);
  })();

  // Example: Update state
  const nameInput = document.querySelector('#nameInput');
  const ageInput = document.querySelector('#ageInput');

  nameInput.addEventListener('input', (event) => {
    globalState.setState('name', event.target.value);
  });

  ageInput.addEventListener('input', (event) => {
    globalState.setState('age', event.target.value);
  });

  // Initialize inputs with current state
  nameInput.value = globalState.getState().name;
  ageInput.value = globalState.getState().age;
});
import Bind from './bind.js';

document.addEventListener('DOMContentLoaded', () => {
  const appElement = document.querySelector('#app');

  const app = new Bind({
    element: appElement,
    data: {
      name: 'Alice',
      age: 25
    }
  });
});
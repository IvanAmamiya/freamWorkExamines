import { globalState } from './bind.js';

// Example: Subscribe to state changes
export function subscribeToState() {
  globalState.subscribe('name', (newValue) => {
    console.log(`Name updated to: ${newValue}`);
  });

  globalState.subscribe('age', (newValue) => {
    console.log(`Age updated to: ${newValue}`);
  });
}

// Example: Update state asynchronously
export async function updateStateAsync(key, value) {
  return new Promise((resolve) => {
    setTimeout(() => {
      globalState.setState(key, value);
      resolve();
    }, 1000); // Simulate async operation
  });
}
# Global State Management

This project demonstrates a simple global state management system using JavaScript's `Proxy` and a publish-subscribe pattern.

## Files

- **bind.js**: Contains the `GlobalState` class for managing global state and notifying listeners of changes.
- **examples.js**: Provides examples of how to use the `GlobalState` class, including subscribing to state changes and updating state asynchronously.
- **index.js**: Initializes the application and demonstrates how to bind state to DOM elements.
- **index.html**: The main HTML file for the application.

## Usage

1. Clone the repository.
2. Open `index.html` in a browser to see the application in action.
3. Modify `examples.js` to add more examples or test different use cases.

## Features

- Reactive state management using `Proxy`.
- Publish-subscribe pattern for state change notifications.
- Asynchronous state updates.

## Example Code

### Subscribing to State Changes
```javascript
import { subscribeToState } from './examples.js';
subscribeToState();
```

### Updating State Asynchronously
```javascript
import { updateStateAsync } from './examples.js';
await updateStateAsync('name', 'New Name');
```
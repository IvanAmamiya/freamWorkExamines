class Bind {
  constructor(options = {}) {
    this.data = options.data || {}; // Data object
    this.bindElement = options.element || null; // Bound DOM element
    this.init(options); // Pass options to init
  }

  init(options = {}) {
    if (!this.bindElement) {
      throw new Error("No element specified for binding");
    }

    // Make proxyData accessible globally for external access
    if (options.exportToWindow) {
      window.proxyData = this.proxyData;
    }

    // Use Proxy to observe data changes
    this.proxyData = new Proxy(this.data, {
      get: (target, key) => {
        return target[key];
      },
      set: (target, key, value) => {
        target[key] = value;
        this.updateView(key, value); // Update the view
        return true;
      },
    });

    // Initialize input event binding
    this.bindElement.addEventListener("input", (event) => {
      const key = event.target.getAttribute("data-bind");
      if (key && key in this.proxyData) {
        this.proxyData[key] = event.target.value; // Update data
      }
    });

    // Initialize the view
    this.initView();
  }

  initView() {
    const elements = this.bindElement.querySelectorAll("[data-bind]");
    elements.forEach((element) => {
      const key = element.getAttribute("data-bind");
      if (key && key in this.proxyData) {
        if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
          element.value = this.proxyData[key]; // Initialize input value
        } else {
          element.textContent = this.proxyData[key]; // Initialize other element text
        }
      }
    });
  }

  updateView(key, value) {
    const elements = this.bindElement.querySelectorAll(`[data-bind="${key}"]`);
    elements.forEach((element) => {
      if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
        element.value = value; // Update input value
      } else {
        element.textContent = value; // Update other element text
      }
    });
  }

  // Allow external code to get/set proxyData directly
  get(key) {
    return this.proxyData[key];
  }

  set(key, value) {
    this.proxyData[key] = value;
  }
}

Bind.install = function(options) {
  return new Bind(options);
};

class GlobalState {
  constructor(initialState = {}) {
    this.state = new Proxy(initialState, {
      set: (target, key, value) => {
        target[key] = value;
        this.notify(key);
        return true;
      },
    });
    this.listeners = {};
  }

  // Subscribe to state changes
  subscribe(key, callback) {
    if (!this.listeners[key]) {
      this.listeners[key] = [];
    }
    this.listeners[key].push(async (newValue) => {
      try {
        await callback(newValue);
      } catch (error) {
        console.error(`Error in async callback for key "${key}":`, error);
      }
    });
  }

  // Notify listeners of state changes
  notify(key) {
    if (this.listeners[key]) {
      this.listeners[key].forEach((callback) => {
        callback(this.state[key]);
      });
    }
  }

  // Get the current state
  getState() {
    return this.state;
  }

  // Set a new state value
  setState(key, value) {
    this.state[key] = value;
  }
}

GlobalState.install = function(options) {
  return globalState;
};

const globalState = new GlobalState({
  name: "John Doe",
  age: 30,
});

export default Bind;
export { GlobalState, globalState };

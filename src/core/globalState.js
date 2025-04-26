// 全局状态管理模块
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

  notify(key) {
    if (this.listeners[key]) {
      this.listeners[key].forEach((callback) => {
        callback(this.state[key]);
      });
    }
  }

  getState() {
    return this.state;
  }

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

export { GlobalState, globalState };
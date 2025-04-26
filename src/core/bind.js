class Bind {
  constructor(options = {}) {
    this.component = options.component || null; // 组件实例
    this.bindElement = options.element || null; // Bound DOM element
    this._validateAndInit();
  }

  _validateAndInit() {
    if (!this.bindElement) {
      throw new Error("No element specified for binding");
    }
    if (!this.component) {
      throw new Error("No component instance specified for binding");
    }
    // 自动收集组件实例上的自有属性作为响应式数据
    this.data = {};
    Object.getOwnPropertyNames(this.component).forEach(key => {
      // 只收集非函数属性
      if (typeof this.component[key] !== 'function') {
        this.data[key] = this.component[key];
      }
    });
    // 检查 DOM 上所有 data-bind 是否都在组件实例属性里
    const elements = this.bindElement.querySelectorAll('[data-bind]');
    elements.forEach((element) => {
      const key = element.getAttribute('data-bind');
      if (!(key in this.data)) {
        throw new Error(`Bind error: data-bind=\"${key}\" 未在组件实例上声明!`);
      }
    });
    // 用 Proxy 监听数据变动，直接代理到组件实例属性
    this.proxyData = new Proxy(this.data, {
      get: (target, key) => this.component[key],
      set: (target, key, value) => {
        if (!(key in this.component)) {
          throw new Error(`Bind error: 尝试设置未声明的响应式变量 \"${key}\"`);
        }
        this.component[key] = value;
        this.updateView(key, value);
        return true;
      },
    });
    // 绑定 input 事件
    this.bindElement.addEventListener('input', (event) => {
      const key = event.target.getAttribute('data-bind');
      if (key && key in this.proxyData) {
        this.proxyData[key] = event.target.value;
      }
    });
    // 初始化视图
    this.initView();
  }

  initView() {
    const elements = this.bindElement.querySelectorAll('[data-bind]');
    elements.forEach((element) => {
      const key = element.getAttribute('data-bind');
      if (key && key in this.proxyData) {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
          element.value = this.proxyData[key];
        } else {
          element.textContent = this.proxyData[key];
        }
      }
    });
  }

  updateView(key, value) {
    const elements = this.bindElement.querySelectorAll(`[data-bind="${key}"]`);
    elements.forEach((element) => {
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.value = value;
      } else {
        element.textContent = value;
      }
    });
  }

  get(key) {
    return this.proxyData[key];
  }

  set(key, value) {
    if (!(key in this.proxyData)) {
      throw new Error(`Bind error: 尝试设置未声明的响应式变量 \"${key}\"`);
    }
    this.proxyData[key] = value;
  }
}

Bind.install = function(options) {
  return new Bind(options);
};

export default Bind;

class Bind {
  constructor(options = {}) {
    this.data = options.data || {}; // 数据对象
    this.bindElement = options.element || null; // 绑定的DOM元素
    this.init();
  }

  init() {
    if (!this.bindElement) {
      throw new Error("绑定的元素未指定");
    }

    // 使用 Proxy 监听数据变化
    this.proxyData = new Proxy(this.data, {
      get: (target, key) => {
        console.log(`读取属性: ${key}`); // 日志记录
        return target[key];
      },
      set: (target, key, value) => {
        target[key] = value;
        this.updateView(key, value); // 更新视图
        return true;
      },
    });

    // 初始化绑定事件
    this.bindElement.addEventListener("input", (event) => {
      const key = event.target.getAttribute("data-bind");
      if (key && key in this.proxyData) {
        this.proxyData[key] = event.target.value; // 更新数据
      }
    });

    // 初始化视图
    this.initView();
  }

  initView() {
    const inputs = this.bindElement.querySelectorAll("[data-bind]");
    inputs.forEach((input) => {
      const key = input.getAttribute("data-bind");
      if (key && key in this.proxyData) {
        input.value = this.proxyData[key]; // 初始化输入框的值
      }
    });
  }

  updateView(key, value) {
    const inputs = this.bindElement.querySelectorAll(`[data-bind="${key}"]`);
    inputs.forEach((input) => {
      input.value = value; // 更新输入框的值
    });
  }
}

export default Bind;

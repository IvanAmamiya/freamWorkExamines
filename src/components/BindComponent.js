import Bind from '../core/bind.js';

export class BindComponent extends HTMLElement {
  constructor() {
    super();
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
    }
    // 不在这里初始化 Bind，延迟到子类构造完成后
  }
  // 便于子类访问绑定数据
  get proxyData() {
    return this._bind?.proxyData;
  }
  // 提供一个初始化方法，供子类调用
  _initBind(bindOptions = {}) {
    this._bind = new Bind({
      ...bindOptions,
      component: this,
      element: this.shadowRoot,
    });
  }
}

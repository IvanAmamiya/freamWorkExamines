import Bind from './bind.js';

export class BindComponent extends HTMLElement {
  constructor(bindOptions = {}) {
    super();
    // 组件可选用 shadow DOM 或 light DOM
    // 这里默认用 shadow DOM，如需 light DOM 可在子类中调整
    this.attachShadow({ mode: 'open' });
    // 绑定数据，element 设为 shadowRoot
    this._bind = new Bind({
      ...bindOptions,
      element: this.shadowRoot,
    });
  }
  // 便于子类访问绑定数据
  get proxyData() {
    return this._bind.proxyData;
  }
}

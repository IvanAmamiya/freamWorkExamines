import Bind from './bind.js';

export class BindComponent extends HTMLElement {
  constructor(bindOptions = {}) {
    super();
    this.attachShadow({ mode: 'open' });
    // 始终传递 component: this，保证不会报错
    this._bind = new Bind({
      ...bindOptions,
      component: this,
      element: this.shadowRoot,
    });
  }
  // 便于子类访问绑定数据
  get proxyData() {
    return this._bind.proxyData;
  }
}

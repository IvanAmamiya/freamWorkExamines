import { BindComponent } from './BindComponent.js';

export class HomePage extends BindComponent {
  constructor() {
    super({
      data: {
        name: 'Alice',
        age: 25,
      }
    });
    this.shadowRoot.innerHTML = `
      <p>Name: <span data-bind="name"></span></p>
      <p>Age: <span data-bind="age"></span></p>
      <p>
        Update Name: <input data-bind="name" type="text">
      </p>
      <p>
        Update Age: <input data-bind="age" type="number">
      </p>
      <style>
        p { margin: 8px 0; }
        input { padding: 4px 8px; }
      </style>
    `;
    // 重新初始化 Bind 以绑定 shadowRoot 内的元素
    this._bind.init({
      ...this._bind,
      element: this.shadowRoot
    });
  }
}

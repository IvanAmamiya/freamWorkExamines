import { BindComponent } from './BindComponent.js';

export class HomePage extends BindComponent {
  constructor() {
    super();
    // 直接在实例上声明响应式变量
    this.name = 'Alice';
    this.age = 25;
    this.attachShadow({ mode: 'open' });
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
    // 初始化 Bind，自动扫描实例属性并绑定
    this._bind = new Bind({
      component: this,
      element: this.shadowRoot
    });
  }
}

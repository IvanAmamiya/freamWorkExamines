import { BindComponent } from './BindComponent.js';

export class HomePage extends BindComponent {
  constructor() {
    super();
    this.name = 'Alice';
    this.age = 25;
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
    // 构造完成后延迟初始化 Bind
    this._initBind();
  }

  connectedCallback() {
    // 组件内订阅全局状态示例
    if (window.globalState) {
      window.globalState.subscribe('name', (newValue) => {
        this.name = newValue;
        if (this._bind) this._bind.updateView('name', newValue);
      });
      window.globalState.subscribe('age', (newValue) => {
        this.age = newValue;
        if (this._bind) this._bind.updateView('age', newValue);
      });
    }
  }
}

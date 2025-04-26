export class MyPanel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <div class="panel">
        <h2>面板标题</h2>
        <slot></slot>
        <my-button></my-button>
      </div>
      <style>
        .panel { border: 1px solid #ccc; padding: 16px; border-radius: 6px; }
      </style>
    `;
  }
}
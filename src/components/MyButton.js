export class MyButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <button class="my-button">按钮</button>
      <style>
        .my-button {
          padding: 8px 16px;
          background: #007bff;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .my-button:hover {
          background: #0056b3;
        }
      </style>
    `;
    this.shadowRoot.querySelector('button').onclick = () => {
      this.dispatchEvent(new CustomEvent('my-click', { bubbles: true, composed: true }));
    };
  }
}
export class AppRoot extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <header style="background:#222;color:#fff;padding:8px 16px;">App 根组件</header>
      <main>
        <router-view></router-view>
      </main>
      <style>
        main { padding: 16px; }
      </style>
    `;
  }
}

// 简易 hash 路由实现，导出注册函数
export const routes = {
  '/': () => '<home-page></home-page>',
  '/about': () => '<my-panel><p>关于页面</p><my-button label="点我"></my-button></my-panel>',
};

export function registerRouter(appRootId = 'app') {
  function renderRoute() {
    const path = location.hash.replace(/^#/, '') || '/';
    // 查找 <app-root> 的 shadowRoot 内的 <router-view>
    const appRoot = document.getElementById(appRootId);
    if (!appRoot) return;
    const appRootEl = appRoot.querySelector('app-root');
    if (!appRootEl || !appRootEl.shadowRoot) return;
    const routerView = appRootEl.shadowRoot.querySelector('router-view');
    if (!routerView) return;
    const render = routes[path] || (() => '<my-panel>404 Not Found</my-panel>');
    console.log('Rendering route:', path);
    routerView.innerHTML = render();
  }
  window.addEventListener('hashchange', renderRoute);
  window.addEventListener('DOMContentLoaded', renderRoute);
}

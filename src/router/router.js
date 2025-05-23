// 简易 hash 路由实现，导出注册函数
export const routes = {
  '/': async () => '<home-page></home-page>',
  '/about': async () => {
    // 懒加载 MyPanel 组件
    await import('../components/MyPanel.js');
    await import('../components/MyButton.js');
    return '<my-panel><p>关于页面（懒加载）</p><my-button label="点我"></my-button></my-panel>';
  },
};

// 路由工厂函数，依赖注入路由表
export function createRouter(routes) {
  return { routes };
}

// 注册路由监听和渲染
export function registerRouter(router, appRootId = 'app') {
  async function renderRoute() {
    const path = location.hash.replace(/^#/, '') || '/';
    const appRoot = document.getElementById(appRootId);
    if (!appRoot) return;
    const appRootEl = appRoot.querySelector('app-root');
    if (!appRootEl || !appRootEl.shadowRoot) return;
    const routerView = appRootEl.shadowRoot.querySelector('router-view');
    if (!routerView) return;
    const render = router.routes[path] || (async () => '<my-panel>404 Not Found</my-panel>');
    routerView.innerHTML = await render();
  }
  window.addEventListener('hashchange', renderRoute);
  window.addEventListener('DOMContentLoaded', renderRoute);
}

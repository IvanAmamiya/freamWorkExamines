# Bind Framework Demo

本项目演示了一个基于原生 Web Components 和 Proxy 的响应式全局状态管理与组件化开发框架。

## 主要特性
- **响应式数据绑定**：通过 `Bind` 实现数据与视图的自动同步。
- **全局状态管理**：支持全局状态订阅与异步更新。
- **自定义组件体系**：所有组件继承自统一基类（如 `BindComponent`），支持嵌套、插槽和样式隔离。
- **简易路由系统**：基于 hash 的路由，支持页面级组件切换。
- **模块化开发**：每个组件单独文件，统一注册，便于维护和扩展。

## 目录结构（主开发目录 src/）
- `src/index.html`：入口 HTML，挂载根组件。
- `src/index.js`：应用初始化、全局状态、数据绑定、路由注册。
- `src/core/bind.js`：核心数据绑定实现。
- `src/core/globalState.js`：全局状态管理实现。
- `src/core/app.js`：应用插件机制。
- `src/components/BindComponent.js`：组件基类，自动集成数据绑定。
- `src/components/AppRoot.js`：根组件，包含 `<router-view>`。
- `src/components/HomePage.js`：首页组件，演示数据绑定。
- `src/components/MyPanel.js`、`src/components/MyButton.js`：UI 组件示例。
- `src/router/router.js`：路由表与路由渲染逻辑。
- `src/components.js`：统一注册所有自定义组件。
- `src/examples/examples.js`：全局状态订阅与异步更新示例。
- `server/server.js`：本地开发静态服务器。

> ⚠️ 根目录下已无历史遗留 js 文件，所有主代码均在 src/ 目录下。

## 快速开始
1. 启动本地服务器：
   ```bash
   node server/server.js
   ```
2. 浏览器访问 `http://localhost:3000/#/` 查看首页。
3. 切换到 `#/about` 查看关于页面。

## 组件开发说明
- 新建组件时继承 `BindComponent`，在构造函数中声明响应式属性（如 this.name = ...）后，调用 `this._initBind()` 即可自动获得数据绑定能力。
- 通过 `<slot>` 支持内容分发，实现灵活嵌套。
- 组件注册统一在 `src/components.js` 完成。

## 路由说明
- 路由表在 `src/router/router.js` 中维护，支持自定义页面组件。
- 仅支持 hash 路由（如 `#/about`），无需服务器端支持。

## 路由页面懒加载

本框架支持路由页面的组件懒加载（动态 import）。

- 在 `src/router/router.js` 的路由表中，value 可为 async 函数，内部用 `import()` 动态加载页面组件。
- 例如：
  ```js
  '/about': async () => {
    await import('../components/MyPanel.js');
    await import('../components/MyButton.js');
    return '<my-panel><p>关于页面（懒加载）</p><my-button label="点我"></my-button></my-panel>';
  }
  ```
- 路由切换到 `/about` 时，相关组件才会被加载和注册，提升首屏性能。

## 其他
- 支持自定义 UI 组件、页面级组件、全局状态管理等扩展。
- 适合学习原生组件化、响应式框架原理。

---
如需更多示例或扩展，欢迎提 Issue 或 PR。

# 本项目暂时停更
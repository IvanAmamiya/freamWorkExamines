export function createApp() {
  const plugins = [];
  return {
    use(plugin, options) {
      let result;
      if (typeof plugin === 'function') {
        if (/^class\s/.test(plugin.toString())) {
          result = new plugin(options);
        } else {
          result = plugin(options);
        }
      } else if (plugin && typeof plugin.install === 'function') {
        result = plugin.install(options);
      }
      plugins.push(plugin);
      return result; // Return the plugin instance or result
    },
    plugins,
  };
}
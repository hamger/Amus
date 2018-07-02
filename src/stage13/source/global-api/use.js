export function initUse (Vue) {
  Vue.use = function (plugin, ...args) {
    /* 防止重复注册插件 */
    if (plugin.installed) return

    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args)
    } else {
      plugin.apply(null, args)
    }

    plugin.installed = true
    return this
  }
}

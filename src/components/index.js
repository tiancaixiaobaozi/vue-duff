import Vue from 'vue'

// 自动加载 global 目录下的 .js 结尾的文件
/**
 * @method require.context(arg1, arg2, arg3)
 * @param arg1 {String} 读取文件的路径
 * @param arg2 {Boolean} 是否遍历文件的子目录
 * @param arg3 {RegExp} 匹配文件的正则
 */
const componentsContext = require.context('./global', true, /\.js$/)

componentsContext.keys().forEach(component => {
  const componentConfig = componentsContext(component)
  // 兼容 import export 和 require module.export 两种规范
  const ctrl = componentConfig.default || componentConfig
  Vue.component(ctrl.name, ctrl)
})

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let routes = []
const routerContext = require.context('./', true, /index\.js$/)

routerContext.keys().forEach(route => {
  // 如果是根目录的index.js，不处理
  if (route.startsWith('./index')) return
  const routerModule = routerContext(route)
  routes = [...routes, ...(routerModule.default) || routerModule]
})

export default new Router({
  mode: 'history',
  routes
})

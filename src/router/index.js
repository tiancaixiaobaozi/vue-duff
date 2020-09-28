import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let routes = [
  {
    path: '/avatar',
    name: 'avatar',
    component: () => import('@/views/Avatar')
  },
  {
    path: '/drag',
    name: 'drag',
    component: () => import('@/views/Drag')
  },
  {
    path: '/drag2',
    name: 'drag2',
    component: () => import('@/views/Drag2')
  },
  {
    path: '/remark',
    name: 'remark',
    component: () => import('@/views/Remark')
  }
]
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

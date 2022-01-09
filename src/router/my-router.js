let Vue

class Router {
  constructor(options) {
    this.$options = options

    // current需要响应式，否则hash变化，router-view不会重新渲染
    const initial = window.location.hash.slice(1) || '/'
    Vue.util.defineReactive(this, 'current', initial)

    // 监听hash变化
    window.addEventListener('hashchange', () => {
      this.current = window.location.hash.slice(1)
    })
  }
}

Router.install = function (_Vue) {
  Vue = _Vue

  // 1. 挂载$router属性
  // 使用mixin，保证router创建完毕且附加到选项上时才执行
  Vue.mixin({
    beforeCreate() {
      // 因为根实力上引入了router，所以根实例才能获取到router
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router
      }
    }
  })

  // 实现router-view/router-link
  Vue.component('router-link', {
    props: {
      to: {
        type: String,
        required: true
      }
    },
    render(h) {
      return h('a', {
        attrs: { href: '#' + this.to }
      }, this.$slots.default)
    }
  })
  Vue.component('router-view', {
    render(h) {
      // 获取当前路由所对应的组件，并将其渲染
      let component = null
      const route = this.$router.$options.routes.find(route => route.path === this.$router.current)
      if (route) {
        component = route.component
      }
      console.log(this.$router.current)
      console.log(component)
      return h(component, '')
    }
  })
}

export default Router

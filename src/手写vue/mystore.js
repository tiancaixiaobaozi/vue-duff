let Vue

class Store {
  constructor(options) {
    // data响应式处理
    this._vm = new Vue({
      data: {
        $$state: options.state
      }
    })

    this._mutations = options.mutations
    this._actions = options.actions

    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)
  }

  get state() {
    return this._vm._data.$$state
  }
  set state(v) {
    throw new Error('please reset state:' + v)
  }

  commit(type, payload) {
    const entry = this._mutations[type]
    if (!entry) {
      throw new Error('unknown mutation type')
    }
    entry(this.state, payload)
  }

  dispatch(type, payload) {
    const entry = this._actions[type]
    if (!entry) {
      throw new Error('unknown actions type')
    }
    entry(this, payload)
  }
}

function install(_Vue) {
  Vue = _Vue
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}

export default {
  Store,
  install
}

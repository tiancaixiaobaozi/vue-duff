import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import app from './modules/app'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { user, app },
  state: {
    dataList: []
  },
  getters: {
    dataList: state => state.dataList
  },
  mutations: {
    changeList (state, data) {
      state.dataList = data
    }
  },
  actions: {
    changeListAction(context) {
      setTimeout(() => {
        let data = [
          { id: 1, name: '张三', age: 18 },
          { id: 2, name: '张四', age: 19 },
          { id: 3, name: '张五', age: 20 },
          { id: 4, name: '张六', age: 21 },
          { id: 5, name: '张七', age: 22 },
          { id: 6, name: '张八', age: 23 },
          { id: 7, name: '张九', age: 24 }
        ]
        context.commit('changeList', data)
      }, 2000)
    }
  }
})

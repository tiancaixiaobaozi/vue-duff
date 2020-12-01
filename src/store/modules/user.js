const user = {
  namespaced: true,
  state: {
    userInfo: {
      name: '张三',
      age: 23
    }
  },
  mutations: {
    ['MODIFY'] (state, data) {
      state.userInfo = data
    }
  },
  actions: {
    modifyAction: ({ commit }, params) => {
      commit('MODIFY', params)
    }
  }
}

export default user

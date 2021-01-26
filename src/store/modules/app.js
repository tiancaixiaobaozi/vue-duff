const app = {
  namespaced: true,
  state: {
    app: {
      isWin: true
    }
  },
  actions: {
    checkAction: ({ dispatch }) => {
      dispatch('user/modifyAction', {
        name: '王五',
        age: 25
      }, { root: true })
    }
  }
}

export default app

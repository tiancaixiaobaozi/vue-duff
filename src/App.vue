<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/avatar">图片裁剪</router-link> |
      <router-link to="/drag">拖拽</router-link> |
      <router-link to="/drag2">拖拽2</router-link> |
      <router-link to="/event">事件</router-link> |
    </div>
    <div id="app-container">
      <transition name="fade">
        <keep-alive>
          <router-view />
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<style lang="scss">
body {
  padding: 0;
  margin: 0;
}
code {
  padding: 12px;
  border-radius: 6px;
  background: #2c3e50;
  color: #42b983;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: row;
  min-height: 100vh;
}
#nav {
  width: 150px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #2c3e50;
  a {
    font-weight: bold;
    color: #fff;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
#app-container {
  padding: 30px;
}

/*
  v-enter：定义进入过渡的开始状态。
  v-enter-active：定义进入过渡生效时的状态。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。
  v-enter-to: 定义进入过渡的结束状态。
  v-leave: 定义离开过渡的开始状态。
  v-leave-active：定义离开过渡生效时的状态。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。
  v-leave-to: 定义离开过渡的结束状态。
  默认类名是以上6个，如果在transition标签中指定了name=’xxx’,那么6个类名将会变成
  xxx开头的，例如xxx-enter-active。
*/
.fade-enter-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>

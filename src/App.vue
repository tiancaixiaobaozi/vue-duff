<template>
  <div id="app">
    <el-container>
      <el-aside width="250px" class="menu-bar">
        <el-menu
          :default-active="active"
          router
          class="el-menu-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
        >
          <el-menu-item index="/">Home</el-menu-item>
          <el-submenu index="css">
            <template slot="title">CSS相关</template>
            <el-menu-item index="/grid">Grid布局</el-menu-item>
          </el-submenu>
          <el-submenu index="workspace">
            <template slot="title">我的工作台</template>
            <el-menu-item index="/about">关于</el-menu-item>
            <el-menu-item index="/avatar">图片裁剪</el-menu-item>
            <el-menu-item index="/drag">拖拽1</el-menu-item>
            <el-menu-item index="/drag2">拖拽2</el-menu-item>
            <el-menu-item index="/event">事件</el-menu-item>
            <el-menu-item index="/upload">上传</el-menu-item>
            <el-menu-item index="/waterfall">瀑布流</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <transition name="fade">
          <keep-alive>
            <router-view />
          </keep-alive>
        </transition>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: '/'
    }
  },
  watch: {
    $route(r) {
      this.active = r.path
    }
  }
}
</script>

<style>
/* http://meyerweb.com/eric/tools/css/reset/
   v5.0.1 | 20191019
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
  display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
</style>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.menu-bar {
  background-color: rgb(84, 92, 100);
}
.el-menu {
  border-right: none;
  .el-submenu__title,
  .el-menu-item {
    text-align: left;
  }
}
.el-main {
  height: 100vh;
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
